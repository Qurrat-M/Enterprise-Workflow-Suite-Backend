from fastapi import APIRouter, BackgroundTasks
from pydantic import BaseModel

from app.services.ai_job_service import create_job, get_job
from app.services.ai_worker import process_ai_job


router = APIRouter(
    prefix="/api/v1/ai",
    tags=["AI"],
)


class AnalyzeRequest(BaseModel):
    question: str
    organization_id: str


@router.post("/analyze")
async def analyze(
    request: AnalyzeRequest,
    background_tasks: BackgroundTasks,
):
    try:
        job_id = create_job(
            organization_id=request.organization_id,
            question=request.question,
        )

        background_tasks.add_task(
            process_ai_job,
            job_id,
        )

        return {
            "success": True,
            "message": "AI analysis job created",
            "job_id": job_id,
            "status": "PENDING",
            "question": request.question,
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
            "message": "Unable to create AI analysis job.",
        }


@router.get("/jobs/{job_id}")
async def get_ai_job(job_id: str):
    try:
        job = get_job(job_id)

        if not job:
            return {
                "success": False,
                "message": "AI job not found",
            }

        return {
            "success": True,
            "job": job,
        }

    except Exception:
        return {
            "success": False,
            "message": "Unable to retrieve AI job.",
        }