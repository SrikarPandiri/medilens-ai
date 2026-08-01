from services.ocr_service import extract_text_from_bytes


def test_image_upload_does_not_return_demo_report_text() -> None:
    raw_text = extract_text_from_bytes(b"not a real image", "image/png")

    assert raw_text == ""
    assert "Hemoglobin 13.4" not in raw_text

