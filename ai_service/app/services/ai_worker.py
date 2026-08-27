from app.services.ai_job_service import get_job, update_job_status
from app.services.ai_service import analyze_question


async def process_ai_job(job_id: str):
    job = get_job(job_id)

    if not job:
        return

    try:
        update_job_status(
            job_id=job_id,
            status="PROCESSING",
        )

        answer = await analyze_question(
            question=job["question"],
            organization_id=job["organization_id"],
        )

        update_job_status(
            job_id=job_id,
            status="COMPLETED",
            answer=answer,
        )

    except Exception as error:
        update_job_status(
            job_id=job_id,
            status="FAILED",
            error=str(error),
        )