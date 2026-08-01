from fastapi import APIRouter

from schemas.report import ChatMessage, ChatRequest
from services.gemini_service import answer_chat

router = APIRouter(prefix="/api", tags=["chat"])


@router.post("/chat", response_model=ChatMessage)
async def chat(request: ChatRequest) -> ChatMessage:
    return answer_chat(request.messages)

