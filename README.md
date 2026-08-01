# MediLens AI

Understand your health reports, instantly.

MediLens AI is a full-stack healthcare AI web application that extracts lab report data, explains medical parameters in simple language, stores report history, and compares reports over time.

---
# 🎯 Problem Statement

Medical laboratory reports contain complex medical terminology, numerical values, abbreviations, and reference ranges that are difficult for many people to understand. Most patients rely on healthcare professionals to interpret these reports, while others search online and often encounter confusing or unreliable information.

---

## Challenges

* Patients struggle to understand laboratory parameters.
* Medical abbreviations are difficult for non-medical users.
* Different laboratories use different report formats.
* Elderly and rural populations face additional language barriers.
* Tracking health changes across multiple reports is difficult.
* Existing solutions often provide raw data without meaningful explanations.
---
## Impact

Because of these challenges:

* Patients experience unnecessary anxiety after seeing abnormal values.
* Important health information may be misunderstood.
* Time is spent searching for explanations from unreliable sources.
* Comparing previous reports manually is difficult.
* Healthcare providers spend additional time explaining basic report details.
* Overall health literacy remains low.
---

# 💡 Solution

MediLens AI is an AI-powered healthcare assistant that transforms complex laboratory reports into clear, easy-to-understand health insights.

Users simply upload a medical report (PDF or image). The system extracts laboratory values using OCR, identifies medical parameters, compares them with reference ranges, and uses AI to generate plain-language explanations. The application stores reports securely, enables report comparison over time, and supports multiple languages for improved accessibility.

> **Note:** MediLens AI is designed to educate users and improve health literacy. It does **not** diagnose diseases, prescribe medicines, or replace professional medical advice.
---


# ⚙️ How It Works

```text
Upload Medical Report
        │
        ▼
OCR Extracts Text
        │
        ▼
Medical Parameters Identified
        │
        ▼
Reference Ranges Matched
        │
        ▼
Gemini AI Generates Simple Explanations
        │
        ▼
Health Summary Created
        │
        ▼
Save Report History
        │
        ▼
Dashboard & Trend Analysis
```

### Step-by-Step Workflow

1. User uploads a PDF or image of a laboratory report.
2. OCR extracts all medical text and numerical values.
3. The backend identifies laboratory parameters such as Hemoglobin, WBC, Platelets, Glucose, Cholesterol, etc.
4. Each value is compared with its reference range.
5. Google Gemini AI explains each parameter in simple language.
6. Values outside the reference range are highlighted.
7. A personalized educational health summary is generated.
8. The report is stored securely for future comparison.
9. Users can compare multiple reports to observe health trends over time.

---

# ✨ Key Features

### 📄 Smart Medical Report Upload

* PDF, JPG, JPEG and PNG support
* Drag-and-drop upload
* Secure file handling

### 🔍 OCR-Based Data Extraction

* Automatic text extraction
* Medical table recognition
* Laboratory parameter detection

### 🤖 AI-Powered Medical Explanation

* Simple explanations for every laboratory parameter
* Plain-language summaries
* Educational health insights

### 🚦 Intelligent Result Highlighting

* Normal values
* Values outside the reference range
* Easy-to-read health indicators

### 📊 Interactive Dashboard

* Health overview
* Report statistics
* Historical report tracking
* Trend comparison

### 💬 AI Health Assistant

* Answers questions about laboratory parameters
* Explains medical terminology
* Educational guidance

### 🌍 Multilingual Support

* English
* Telugu
* Hindi
* Additional languages (future)

### 🔐 Secure Cloud Storage

* User authentication
* Secure report storage
* Private report history

---

# 🧠 AI Technologies Used

## Google Gemini API

Used for:

* Medical parameter explanation
* Plain-language summarization
* Educational health insights
* AI-powered question answering
* Multilingual response generation

---

## OCR (EasyOCR / Tesseract)

Used for:

* Reading PDF reports
* Image text extraction
* Table recognition
* Laboratory value extraction

---

## Natural Language Processing (NLP)

Used for:

* Medical text understanding
* Report summarization
* User-friendly explanations

---

## Rule-Based Medical Validation

Used for:

* Reference range comparison
* Normal/High/Low status detection
* Laboratory parameter classification

---

## Supabase

Provides:

* Secure Authentication
* PostgreSQL Database
* Cloud Storage
* User Report History

---

# 🏥 Example Use Case

### Scenario

Rahul, a 45-year-old patient, receives a Complete Blood Count (CBC) report after a routine health checkup. The report contains several unfamiliar medical terms and values.

Instead of searching the internet or waiting for a doctor's appointment, Rahul uploads the report to MediLens AI.

### What MediLens AI Does

* Extracts all laboratory values using OCR.
* Detects parameters such as Hemoglobin, WBC, RBC, Platelets, and Glucose.
* Compares each value with the laboratory's reference range.
* Explains each parameter in simple, non-technical language.
* Highlights values outside the reference range.
* Generates an easy-to-read educational summary.
* Stores the report for future comparison.
* Allows Rahul to compare today's report with previous reports to monitor changes over time.

### Outcome

Rahul gains a clearer understanding of his laboratory report, can prepare informed questions for his healthcare provider, and can easily track changes in future reports without manually comparing documents.

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

- Frontend: `medilens-ai-wine.vercel.app`
- Backend docs: `https://medilens-ai-f98w.onrender.com`

