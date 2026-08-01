# MediLens AI

Understand your health reports, instantly.

MediLens AI is a full-stack healthcare AI web application that extracts lab report data, explains medical parameters in simple language, stores report history, and compares reports over time.

This app is informational only. It does not diagnose disease or prescribe medicine.

## Stack

- Frontend: Next.js 15, React, TypeScript, Tailwind CSS
- Backend: FastAPI, Python
- AI: Google Gemini API
- OCR: EasyOCR/Tesseract-ready service boundary
- Database/Auth/Storage: Supabase
- Charts: Recharts

## Structure

```text
client/       Next.js frontend
server/       FastAPI backend
database/     Supabase SQL schema and seed files
docs/         Architecture, API, and setup notes
assets/       Screenshots, icons, and demo assets
```

## Quick Start

1. Copy environment files:

```bash
cp client/.env.example client/.env.local
cp server/.env.example server/.env
```

2. Install frontend dependencies:

```bash
cd client
npm install
npm run dev
```

3. Install backend dependencies:

```bash
cd server
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

4. Open:

- Frontend: `http://localhost:3000`
- Backend docs: `http://localhost:8000/docs`

