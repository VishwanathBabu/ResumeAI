from PyPDF2 import PdfReader
from fastapi import UploadFile
import io

async def extract_text_from_pdf(file: UploadFile) -> str:
    """
    Extracts text from an uploaded PDF file.
    """
    try:
        content = await file.read()
        pdf_stream = io.BytesIO(content)
        reader = PdfReader(pdf_stream)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return ""
