from uuid import UUID
from app.db import get_connection


def create_job(organization_id: str, question: str) -> str:
    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO ai_jobs (
                organization_id,
                question,
                status
            )
            VALUES (%s, %s, %s)
            RETURNING id
            """,
            (
                organization_id,
                question,
                "PENDING",
            ),
        )

        job_id = cursor.fetchone()[0]

        connection.commit()

        return str(job_id)

    finally:
        connection.close()


def update_job_status(
    job_id: str,
    status: str,
    answer: str | None = None,
    error: str | None = None,
):
    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            UPDATE ai_jobs
            SET
                status = %s,
                answer = %s,
                error = %s,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = %s
            """,
            (
                status,
                answer,
                error,
                job_id,
            ),
        )

        connection.commit()

    finally:
        connection.close()


def get_job(job_id: str):
    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT
                id,
                organization_id,
                question,
                status,
                answer,
                error,
                created_at,
                updated_at
            FROM ai_jobs
            WHERE id = %s
            """,
            (job_id,),
        )

        row = cursor.fetchone()

        if not row:
            return None

        return {
            "id": str(row[0]),
            "organization_id": str(row[1]),
            "question": row[2],
            "status": row[3],
            "answer": row[4],
            "error": row[5],
            "created_at": row[6],
            "updated_at": row[7],
        }

    finally:
        connection.close()