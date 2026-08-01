from config.settings import get_settings
from schemas.report import ChatMessage, ExtractedTest


DISCLAIMER = "This information is educational and is not a medical diagnosis or prescription."


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
            content=f"In simple terms: {latest or 'that term'} is a medical report item. Connect Gemini to provide richer explanations."
        )

    # Gemini integration is intentionally isolated here so the route contract stays stable.
    return ChatMessage(
        role="assistant",
        content="Gemini API is configured. Replace this placeholder with the model call for production responses."
    )

