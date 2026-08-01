import logging
import json
import re

from config.settings import get_settings
from schemas.report import ChatMessage, ExtractedTest

DISCLAIMER = "This information is educational and is not a medical diagnosis or prescription."
logger = logging.getLogger(__name__)


def _fallback_explanation(question: str) -> str:
    normalized = question.lower()
    if "mcv" in normalized:
        return (
            "MCV means mean corpuscular volume. It describes the average size of your red blood cells. "
            "Low or high MCV can happen for different reasons, so it should be interpreted with hemoglobin, "
            "other CBC values, symptoms, and a clinician's advice."
        )

    topic = question.strip() or "that term"
    return (
        f"{topic} is a medical report term. I can explain it generally, but personal meaning depends on the "
        "full report, reference range, symptoms, and your doctor's interpretation."
    )


def generate_summary(tests: list[ExtractedTest], language: str) -> tuple[str, list[str]]:
    if not tests:
        return (
            "No medical parameters were extracted from this upload. Try a clearer report image or a text-based PDF.",
            [
                "Make sure the report text is sharp and readable.",
                "Avoid cropped screenshots that hide test names, values, units, or reference ranges.",
                f"Preferred explanation language: {language}."
            ]
        )

    abnormal = [test for test in tests if test.status in {"low", "high"}]
    if abnormal:
        names = ", ".join(test.name for test in abnormal)
        summary = f"Your report has values outside the reference range for {names}. Review these with a qualified clinician."
    else:
        summary = "The extracted values are within the reference ranges available to MediLens AI."

    tips = [
        "Use this summary as a conversation starter with your doctor.",
        "Compare results over time instead of relying on one report alone.",
        f"Preferred explanation language: {language}."
    ]
    return summary, tips


def extract_report_with_gemini(content: bytes, content_type: str | None, language: str) -> tuple[str, str | None, str | None, list[ExtractedTest]]:
    settings = get_settings()
    if not settings.gemini_api_key or not content:
        return "", None, None, []

    try:
        import google.generativeai as genai

        genai.configure(api_key=settings.gemini_api_key)
        model = genai.GenerativeModel(settings.gemini_model)
        prompt = f"""
Extract structured lab report data from this file.

Return JSON only with this shape:
{{
  "rawText": "short transcription of the useful report text",
  "patientName": "name if visible, otherwise null",
  "reportDate": "YYYY-MM-DD if visible, otherwise null",
  "tests": [
    {{
      "name": "test name",
      "value": "numeric or text value",
      "unit": "unit if visible",
      "referenceRange": "range if visible",
      "status": "low, normal, high, or unknown",
      "explanation": "one simple sentence in {language}"
    }}
  ]
}}

Rules:
- Extract only values visible in the uploaded report.
- Do not invent common tests or demo values.
- If a value is unreadable, omit that test.
- Do not diagnose or prescribe.
"""
        response = model.generate_content(
            [prompt, {"mime_type": content_type or "application/octet-stream", "data": content}],
            request_options={"timeout": 20}
        )
        text = (response.text or "").strip()
        match = re.search(r"\{.*\}", text, flags=re.DOTALL)
        if not match:
            return "", None, None, []

        payload = json.loads(match.group(0))
        tests = [
            ExtractedTest(
                name=str(item.get("name", "")).strip(),
                value=str(item.get("value", "")).strip(),
                unit=item.get("unit"),
                referenceRange=item.get("referenceRange"),
                status=item.get("status") if item.get("status") in {"low", "normal", "high", "unknown"} else "unknown",
                explanation=str(item.get("explanation") or "This is a lab report parameter.").strip()
            )
            for item in payload.get("tests", [])
            if item.get("name") and item.get("value")
        ]
        return (
            str(payload.get("rawText") or ""),
            payload.get("patientName"),
            payload.get("reportDate"),
            tests
        )
    except Exception as exc:
        logger.exception("Gemini report extraction failed: %s", exc)
        return "", None, None, []


def answer_chat(messages: list[ChatMessage]) -> ChatMessage:
    settings = get_settings()
    latest = next((message.content for message in reversed(messages) if message.role == "user"), "")

    if not settings.gemini_api_key:
        return ChatMessage(
            role="assistant",
            content=_fallback_explanation(latest)
        )

    try:
        import google.generativeai as genai

        genai.configure(api_key=settings.gemini_api_key)
        model = genai.GenerativeModel(settings.gemini_model)
        conversation = "\n".join(f"{message.role}: {message.content}" for message in messages[-8:])
        prompt = f"""
You are MediLens AI, a careful healthcare report explainer.

Rules:
- Explain medical terms in simple, friendly language.
- Do not diagnose diseases.
- Do not prescribe medicines, dosages, or treatment plans.
- Encourage the user to consult a qualified clinician for abnormal values or personal medical decisions.
- Keep the answer under 120 words.

Conversation:
{conversation}

Answer the latest user question.
"""
        response = model.generate_content(prompt, request_options={"timeout": 12})
        text = (response.text or "").strip()
        if not text:
            text = "I could not generate an explanation for that term. Please try rephrasing it."

        return ChatMessage(role="assistant", content=text)
    except Exception as exc:
        logger.exception("Gemini chat request failed: %s", exc)
        return ChatMessage(
            role="assistant",
            content=_fallback_explanation(latest)
        )
