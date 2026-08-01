from io import BytesIO


def extract_text_from_bytes(content: bytes, content_type: str | None = None) -> str:
    if not content:
        return ""

    if content_type == "text/plain":
        return content.decode("utf-8", errors="ignore")

    if content_type == "application/pdf":
        try:
            from pypdf import PdfReader

            reader = PdfReader(BytesIO(content))
            return "\n".join(page.extract_text() or "" for page in reader.pages)
        except Exception:
            return ""

    return ""
