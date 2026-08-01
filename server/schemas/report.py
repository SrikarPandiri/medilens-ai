from pydantic import BaseModel, Field


class ExtractedTest(BaseModel):
    name: str
    value: str
    unit: str | None = None
    referenceRange: str | None = None
    status: str = Field(default="unknown", pattern="^(low|normal|high|unknown)$")
    explanation: str


class ReportSummary(BaseModel):
    id: str
    patientName: str | None = None
    reportDate: str | None = None
    language: str
    tests: list[ExtractedTest]
    summary: str
    lifestyleTips: list[str]
    disclaimer: str


class ChatMessage(BaseModel):
    role: str = Field(pattern="^(user|assistant)$")
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]

