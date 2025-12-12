# ResumeAI 🚀

**Beat the ATS. Get Hired Faster.**

ResumeAI is an intelligent SaaS application that helps job seekers optimize their resumes. By analyzing your PDF resume against a specific job description, it provides a "Match Score", identifies missing keywords, and offers actionable AI-driven advice to improve your chances of getting an interview.

## ✨ Features

-   **📄 PDF Resume Parsing**: Automatically extracts text from uploaded PDF resumes.
-   **🎯 Smart Match Score**: Uses Vector Embeddings (Cosine Similarity) to calculate how well your resume matches the job description.
-   **🔍 Gap Analysis**: Identifies critical keywords missing from your resume that are present in the job description.
-   **🤖 AI Career Coach**: Provides specific, actionable bullet points on how to improve your resume content using GPT-4-turbo (or GPT-3.5).
-   **🎨 Premium UI**: Built with Next.js, Tailwind CSS, and Shadcn/ui for a clean, modern, and expensive-looking interface.
-   **🛡️ Demo Mode**: Works even without an active OpenAI quota by providing realistic mock analysis for demonstration purposes.

## 🛠️ Tech Stack

### Frontend
-   **Framework**: Next.js 14+ (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS, Shadcn/ui
-   **Icons**: Lucide React

### Backend
-   **Framework**: FastAPI (Python)
-   **AI/ML**: OpenAI API (Embeddings & Completion), NumPy
-   **Parsing**: PyPDF2

## 🚀 Getting Started

### Prerequisites
-   Node.js 18+
-   Python 3.9+
-   OpenAI API Key (Optional for Demo Mode, Required for Real Analysis)

### 1. Backend Setup (Python)

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Set up your Environment Variables:
    -   Rename `.env.example` to `.env`
    -   Add your API Key: `OPENAI_API_KEY=sk-...`
4.  Start the Server:
    ```bash
    python main.py
    ```
    

### 2. Frontend Setup (Next.js)

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Development Server:
    ```bash
    npm run dev
    ```
4.  Open your browser and visit [http://localhost:3000](http://localhost:3000).


