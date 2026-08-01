from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/api/auth", tags=["auth"])


class AuthRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/signup")
async def signup(payload: AuthRequest) -> dict:
    return {"message": "Connect Supabase Auth here.", "email": payload.email}


@router.post("/login")
async def login(payload: AuthRequest) -> dict:
    return {"accessToken": "development-token", "email": payload.email}

