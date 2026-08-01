# Architecture

MediLens AI uses a client-server architecture.

```text
Browser -> Next.js client -> FastAPI server -> OCR/Gemini/Supabase
```

The first implementation keeps OCR, AI, and persistence behind service modules so production providers can replace the development placeholders without changing route contracts.

## Main Flow

1. User uploads a PDF or image report.
2. Backend extracts raw text through the OCR service.
3. Parser identifies known medical parameters and reference ranges.
4. AI service creates a plain-language summary and safety disclaimer.
5. Report is saved and returned to the dashboard.
6. User can ask terminology questions through the chat endpoint.

