# ResumeAI System Architecture

## Overview
ResumeAI is a SaaS application designed to help job seekers optimize their resumes by comparing them against specific job descriptions using AI.

## High-Level Architecture
The system follows a typical Client-Server architecture:
- **Client (Frontend)**: Next.js application handling UI, file uploads, and displaying results.
- **Server (Backend)**: FastAPI application handling business logic, PDF parsing, and AI interactions.
- **AI Services**: OpenAI API for Embeddings and Text Generation.
- **Storage**: (Future) PostgreSQL for user data, Pinecone for vector storage.

## Data Flow Pipeline

### 1. Input Stage
*   **User Action**: Drag & Drop PDF Resume + Paste Job Description Text.
*   **Frontend**: Validates input and sends a `POST` request to `/scan` endpoint with `multipart/form-data`.

### 2. Processing Stage (Backend)
*   **PDF Parsing**:
    *   The `services.parser` module receives the file stream.
    *   Uses `PyPDF2` (or LlamaParse) to extract raw text strings from the PDF.
*   **Vectorization**:
    *   The `services.matcher` module takes both Resume Text and Job Description Text.
    *   Calls OpenAI `text-embedding-3-small` API to generate high-dimensional vector embeddings for both texts.

### 3. Matching Engine
*   **Cosine Similarity**:
    *   The backend calculates the Cosine Similarity score (0.0 to 1.0) between the Resume Vector and Job Vector.
    *   This score is converted to a percentage (Match Score).

### 4. Analysis Stage
*   **LLM Analysis**:
    *   The backend constructs a prompt with Resume Text + Job Text.
    *   Calls OpenAI `gpt-4-turbo` to:
        *   Identify missing keywords (Gap Analysis).
        *   Generate specific, actionable advice for improvement.

### 5. Output Stage
*   **Response**: The API returns a structured JSON response:
    ```json
    {
      "score": 85,
      "missing_keywords": ["Python", "Docker"],
      "advice": ["Add a project dealing with containers.", "Move education section to bottom."]
    }
    ```
*   **Frontend**: Visualization
    *   Updates the **Score Gauge** with the score.
    *   Lists **Missing Keywords** in red badges.
    *   Displays **Advice** as a checklist.

## Technology Stack
*   **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Shadcn/ui.
*   **Backend**: Python 3.9+, FastAPI, Uvicorn, Scikit-learn, OpenAI SDK.
*   **External**: OpenAI API.
