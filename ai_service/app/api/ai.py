from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter(
    prefix="/api/v1/ai",
    tags=["AI"]
)


class AnalyzeRequest(BaseModel):
    question: str


@router.post("/analyze")
def analyze(request: AnalyzeRequest):
    return {
        "success": True,
        "message": "AI analysis endpoint is working",
        "question": request.question
    }