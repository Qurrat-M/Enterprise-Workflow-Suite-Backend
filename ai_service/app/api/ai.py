from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai_service import analyze_question


router = APIRouter(
    prefix="/api/v1/ai",
    tags=["AI"]
)


class AnalyzeRequest(BaseModel):
    question: str
    organization_id: str


@router.post("/analyze")
async def analyze(request: AnalyzeRequest):
    try:
        answer = await analyze_question(
            question=request.question,
            organization_id=request.organization_id,
        )

        return {
            "success": True,
            "question": request.question,
            "answer": answer,
        }

    except ValueError as error:
        return {
            "success": False,
            "message": str(error),
        }

    except RuntimeError as error:
        return {
            "success": False,
            "message": str(error),
        }

    except Exception:
        return {
            "success": False,
            "message": "AI analysis failed. Please try again later.",
        }