from uuid import uuid4

from fastapi import APIRouter, File, Form, UploadFile

from schemas.report import ReportSummary
from services import database_service
from services.gemini_service import DISCLAIMER, generate_summary
from services.medical_parser import parse_patient_name, parse_report_date, parse_tests
from services.ocr_service import extract_text

router = APIRouter(prefix="/api/report", tags=["report"])


@router.post("/upload", response_model=ReportSummary)
async def upload_report(file: UploadFile = File(...), language: str = Form("English")) -> ReportSummary:
    raw_text = await extract_text(file)
    tests = parse_tests(raw_text)
    summary, lifestyle_tips = generate_summary(tests, language)
    report = ReportSummary(
        id=str(uuid4()),
        patientName=parse_patient_name(raw_text),
        reportDate=parse_report_date(raw_text),
        language=language,
        tests=tests,
        summary=summary,
        lifestyleTips=lifestyle_tips,
        disclaimer=DISCLAIMER
    )
    return database_service.save_report(report)


@router.post("/analyze", response_model=ReportSummary)
async def analyze_latest_report() -> ReportSummary:
    reports = database_service.list_reports()
    if reports:
        return reports[0]

    report = ReportSummary(
        id=str(uuid4()),
        patientName="Demo Patient",
        reportDate=None,
        language="English",
        tests=[],
        summary="Upload a report before requesting analysis.",
        lifestyleTips=["Upload a PDF or image report to begin."],
        disclaimer=DISCLAIMER
    )
    return report


@router.get("/history", response_model=list[ReportSummary])
async def report_history() -> list[ReportSummary]:
    return database_service.list_reports()


@router.get("/compare", response_model=dict)
async def compare_reports() -> dict:
    reports = database_service.list_reports()[:2]
    return {
        "reportsCompared": len(reports),
        "message": "Comparison service is ready for historical trend logic."
    }

