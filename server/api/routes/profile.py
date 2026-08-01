from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["profile"])


@router.get("/profile")
async def profile() -> dict:
    return {"name": "Demo Patient", "language": "English"}


@router.get("/settings")
async def settings() -> dict:
    return {"language": "English", "notifications": True}

