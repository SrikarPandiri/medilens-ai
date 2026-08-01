import logging

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
