import re

from schemas.report import ExtractedTest


REFERENCE_TESTS = {
    "Hemoglobin": {
        "unit": "g/dL",
        "low": 12.0,
        "high": 16.0,
        "range": "12.0-16.0",
        "explanation": "Hemoglobin carries oxygen from the lungs to the rest of the body."
    },
    "Vitamin D": {
        "unit": "ng/mL",
        "low": 30.0,
        "high": 100.0,
        "range": "30-100",
        "explanation": "Vitamin D supports bone strength, muscles, and immune health."
    },
    "LDL Cholesterol": {
        "unit": "mg/dL",
        "low": 0.0,
        "high": 100.0,
        "range": "<100",
        "explanation": "LDL cholesterol can contribute to plaque buildup when elevated."
    }
}


def _status(value: float, low: float, high: float, less_than_target: bool = False) -> str:
    if less_than_target:
        return "normal" if value < high else "high"
    if value < low:
        return "low"
    if value > high:
        return "high"
    return "normal"


def parse_tests(raw_text: str) -> list[ExtractedTest]:
    tests: list[ExtractedTest] = []

    for name, metadata in REFERENCE_TESTS.items():
        pattern = rf"{re.escape(name)}\s+([\d.]+)"
        match = re.search(pattern, raw_text, flags=re.IGNORECASE)
        if not match:
            continue

        value = float(match.group(1))
        tests.append(
            ExtractedTest(
                name=name,
                value=f"{value:g}",
                unit=metadata["unit"],
                referenceRange=metadata["range"],
                status=_status(
                    value,
                    metadata["low"],
                    metadata["high"],
                    less_than_target=str(metadata["range"]).startswith("<")
                ),
                explanation=metadata["explanation"]
            )
        )

    return tests


def parse_patient_name(raw_text: str) -> str | None:
    match = re.search(r"Patient Name:\s*(.+)", raw_text, flags=re.IGNORECASE)
    return match.group(1).strip() if match else None


def parse_report_date(raw_text: str) -> str | None:
    match = re.search(r"Report Date:\s*([\d-]+)", raw_text, flags=re.IGNORECASE)
    return match.group(1).strip() if match else None

