from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import auth, chat, profile, report
from config.settings import get_settings

settings = get_settings()

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth.router)
app.include_router(report.router)
app.include_router(chat.router)
app.include_router(profile.router)


@app.get("/")
@app.head("/")
async def root() -> dict:
    return {"status": "ok", "app": settings.app_name}


@app.get("/health")
async def health() -> dict:
    return {"status": "ok", "app": settings.app_name}
