   
📘 MediLens AI — Complete Technical Specification
1. Project Overview

Project Name: MediLens AI

Tagline: Understand Your Health Reports, Instantly.

Theme: AI for Industry & Public Impact

Category: Healthcare AI

Project Type: Full Stack AI Web Application

Architecture: Client–Server Architecture

Development Style: Modular Monorepo

Deployment:

Frontend → Vercel
Backend → Railway/Render
Database → Supabase Cloud
AI → Google Gemini API
2. What Exactly is MediLens AI?

MediLens AI is an AI-powered healthcare assistant that converts complex laboratory reports into simple, understandable explanations.

Instead of only reading a PDF, it:

Extracts medical information
Identifies blood parameters
Compares values with reference ranges
Uses AI to explain each parameter
Generates a health summary
Answers medical terminology questions
Stores previous reports
Compares reports over time
Supports multiple Indian languages

Important: It does not diagnose diseases or prescribe medicines.

3. Overall System Architecture
                    ┌────────────────────────────┐
                    │        USER (Browser)      │
                    └─────────────┬──────────────┘
                                  │ HTTPS
                                  ▼
                    ┌────────────────────────────┐
                    │     Next.js Frontend       │
                    │  React + Tailwind + TS     │
                    └─────────────┬──────────────┘
                                  │ REST API
                                  ▼
                    ┌────────────────────────────┐
                    │      FastAPI Backend       │
                    └─────────────┬──────────────┘
             ┌────────────────────┼────────────────────┐
             ▼                    ▼                    ▼
      OCR Engine            Gemini AI           Supabase DB
   (EasyOCR/Tesseract)      (Analysis)          + Storage/Auth
             │                    │                    │
             └────────────────────┴────────────────────┘
                                  │
                                  ▼
                         JSON Response
                                  │
                                  ▼
                       Interactive Dashboard
4. Client–Server Architecture
Client (Frontend)

Responsible for

Login
Upload PDF
Dashboard
Charts
AI Chat
Report History
User Settings
Language Switching

Technology

Next.js
React
TypeScript
Tailwind CSS
ShadCN UI
Server (Backend)

Responsible for

Authentication
OCR
AI Processing
Database
File Upload
Report Parsing
APIs
Security

Technology

Python
FastAPI
5. Technology Stack
Layer	Technology
Frontend	Next.js 15
UI	Tailwind CSS
Components	ShadCN UI
Language	TypeScript
Backend	FastAPI
Backend Language	Python
AI	Google Gemini API
OCR	EasyOCR + Tesseract
Database	Supabase PostgreSQL
Authentication	Supabase Auth
File Storage	Supabase Storage
Charts	Recharts
Deployment	Vercel + Railway
6. Programming Languages
Frontend
TypeScript
HTML5
CSS3
Backend
Python
Database
SQL (PostgreSQL)
AI Prompting
Natural Language Prompt Engineering
API Format
JSON
7. Root Directory Structure
medilens-ai/
│
├── client/
│
├── server/
│
├── database/
│
├── docs/
│
├── assets/
│
├── .github/
│
├── README.md
│
├── LICENSE
│
├── .gitignore
│
├── docker-compose.yml
│
└── package.json
8. Client Folder Structure
client/

src/

app/

components/

pages/

dashboard/

upload/

history/

chat/

profile/

hooks/

context/

services/

lib/

utils/

types/

styles/

public/

icons/

images/

fonts/
9. Server Folder Structure
server/

api/

routes/

controllers/

models/

schemas/

services/

ocr/

gemini/

authentication/

middlewares/

database/

config/

utils/

tests/

main.py

requirements.txt
10. Database Structure
database/

schema.sql

seed.sql

migrations/

functions/

views/

policies/
11. Database Tables
Users

Reports

ExtractedTests

AISummary

ChatHistory

ReportComparison

Translations

UserSettings

AuditLogs
12. Project Workflow
User

↓

Login

↓

Upload Report

↓

OCR Extracts Text

↓

Backend Receives Data

↓

Medical Parameters Identified

↓

Gemini AI Generates Explanation

↓

Summary Generated

↓

Save to Database

↓

Dashboard Updates

↓

User Can Chat With AI

↓

Compare Previous Reports

↓

Download Summary
13. Request Flow
Browser

↓

Frontend

↓

POST /upload-report

↓

Backend

↓

OCR

↓

Extract Values

↓

Gemini AI

↓

JSON Response

↓

Frontend Dashboard

↓

Charts + Summary
14. AI Processing Flow
Medical Report

↓

OCR

↓

Extract Raw Text

↓

Clean Text

↓

Identify Blood Tests

↓

Reference Range Matching

↓

AI Prompt

↓

Gemini Response

↓

Generate Summary

↓

Display to User
15. OCR Pipeline
PDF/Image

↓

Image Enhancement

↓

Text Detection

↓

OCR Extraction

↓

Table Recognition

↓

Medical Parameter Parsing

↓

JSON Conversion
16. Folder Communication Flow
Client

↓

API Request

↓

FastAPI

↓

OCR Module

↓

Gemini Module

↓

Database

↓

API Response

↓

Dashboard
17. API Structure
POST

/api/auth/signup

/api/auth/login

/api/report/upload

/api/report/analyze

/api/report/history

/api/report/compare

/api/chat

/api/profile

/api/settings
18. Backend Modules
Authentication

↓

Upload Service

↓

OCR Service

↓

Medical Parser

↓

Gemini AI Service

↓

Database Service

↓

Chat Service

↓

Report Comparison

↓

Translation Service
19. AI Module
Gemini AI

↓

Receives Extracted Data

↓

Prompt Engineering

↓

Medical Explanation

↓

Health Summary

↓

Lifestyle Tips

↓

JSON Response
20. Database ER Diagram (Simplified)
Users
│
├── Reports
│      │
│      ├── ExtractedTests
│      │
│      └── AISummary
│
├── ChatHistory
│
├── UserSettings
│
└── ReportComparison
21. Security Flow
User Login

↓

JWT Token

↓

Authenticated Request

↓

API Validation

↓

Database

↓

Encrypted Storage
22. Deployment Architecture
             Vercel
      (Next.js Frontend)

             │

             ▼

      Railway / Render
      (FastAPI Backend)

             │

      ┌──────┴────────┐

      ▼               ▼

 Gemini API      Supabase Cloud

                     │

          PostgreSQL + Storage
23. Development Workflow
GitHub

↓

Clone Repository

↓

Frontend Development

↓

Backend Development

↓

Database

↓

Integration

↓

Testing

↓

Deployment

↓

Hackathon Demo
24. Final Project Structure
medilens-ai/

│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── next.config.ts
│
├── server/
│   ├── api/
│   ├── services/
│   ├── models/
│   ├── ocr/
│   ├── gemini/
│   ├── auth/
│   ├── database/
│   ├── main.py
│   └── requirements.txt
│
├── database/
│   ├── schema.sql
│   ├── migrations/
│   └── seed.sql
│
├── docs/
│   ├── architecture.md
│   ├── api.md
│   ├── setup.md
│   └── presentation.md
│
├── assets/
│   ├── screenshots/
│   ├── icons/
│   └── demo/
│
├── .github/
│   └── workflows/
│
├── .env.example
├── docker-compose.yml
├── README.md
├── LICENSE
├── package.json
└── .gitignore