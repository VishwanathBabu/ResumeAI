# ResumeAI 🚀

**Beat the ATS. Get Hired Faster.**

ResumeAI is an intelligent SaaS application that helps job seekers optimize their resumes. By analyzing your PDF resume against a specific job description, it provides a "Match Score", identifies missing keywords, and offers actionable AI-driven advice to improve your chances of getting an interview.

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


