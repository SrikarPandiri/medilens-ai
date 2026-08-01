from fastapi import UploadFile


async def extract_text(file: UploadFile) -> str:
    content = await file.read()
    if not content:
        return ""

    # Placeholder until OCR engines are installed/configured in the deployment image.
    # The parser receives a deterministic sample so the first vertical slice works end-to-end.
    return """
    Patient Name: Demo Patient
    Report Date: 2026-07-31
    Hemoglobin 13.4 g/dL Reference 12.0-16.0
    Vitamin D 18 ng/mL Reference 30-100
    LDL Cholesterol 142 mg/dL Reference <100
    """

