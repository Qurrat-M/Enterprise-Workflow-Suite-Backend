from fastapi import APIRouter
from pydantic import BaseModel

from app.llm_service import generate_response


router = APIRouter(
    prefix="/api/v1/ai",
    tags=["AI"]
)


class AnalyzeRequest(BaseModel):
    question: str


@router.post("/analyze")
async def analyze(request: AnalyzeRequest):

    answer = await generate_response(request.question)

    return {
        "success": True,
        "question": request.question,
        "answer": answer
    }