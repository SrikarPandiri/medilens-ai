# Setup

## Frontend

```bash
cd client
npm install
npm run dev
```

## Backend

```bash
cd server
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Environment

Copy `.env.example` files and fill in Supabase and Gemini keys before connecting production services.

