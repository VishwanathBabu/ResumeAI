from fastapi import FastAPI, UploadFile, Form, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.parser import extract_text_from_pdf
from services.matcher import calculate_match_score, analyze_resume_gaps
import os

app = FastAPI(title="ResumeAI Scanner")

# Enable CORS for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisResponse(BaseModel):
    score: float
    missing_keywords: list[str]
    advice: list[str]

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/scan", response_model=AnalysisResponse)
async def scan_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    # 1. Extract Text
    resume_text = await extract_text_from_pdf(resume)
    print(f"DEBUG: Extracted text length: {len(resume_text)}")
    if not resume_text:
        print("DEBUG: Resume text is empty!")
        raise HTTPException(status_code=400, detail="Could not extract text from PDF")

    # 2. Calculate Score
    score = calculate_match_score(resume_text, job_description)
    print(f"DEBUG: Calculated Score: {score}")

    # 3. Analyze Gaps with LLM
    analysis = analyze_resume_gaps(resume_text, job_description)
    print(f"DEBUG: Analysis result: {analysis}")

    return {
        "score": score,
        "missing_keywords": analysis.get("missing_keywords", []),
        "advice": analysis.get("advice", [])
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
