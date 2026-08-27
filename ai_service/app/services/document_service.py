from app.db import get_connection


def create_document(
    organization_id: str,
    title: str,
    content: str,
    file_name: str | None = None,
    document_type: str | None = None,
) -> str:
    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO ai_documents (
                organization_id,
                title,
                file_name,
                content,
                document_type
            )
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
            """,
            (
                organization_id,
                title,
                file_name,
                content,
                document_type,
            ),
        )

        document_id = cursor.fetchone()[0]

        connection.commit()

        return str(document_id)

    finally:
        connection.close()


def get_document(document_id: str):
    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT
                id,
                organization_id,
                title,
                file_name,
                content,
                document_type,
                status,
                created_at,
                updated_at
            FROM ai_documents
            WHERE id = %s
            """,
            (document_id,),
        )

        row = cursor.fetchone()

        if not row:
            return None

        return {
            "id": str(row[0]),
            "organization_id": str(row[1]),
            "title": row[2],
            "file_name": row[3],
            "content": row[4],
            "document_type": row[5],
            "status": row[6],
            "created_at": row[7],
            "updated_at": row[8],
        }

    finally:
        connection.close()