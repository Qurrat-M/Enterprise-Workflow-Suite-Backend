import asyncio

from app.db import get_connection
from app.services.chunking_service import chunk_text
from app.services.embedding_service import generate_embedding


async def ingest_document(document_id: str):
    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT
                id,
                organization_id,
                content
            FROM ai_documents
            WHERE id = %s
              AND status = 'ACTIVE'
            """,
            (document_id,),
        )

        document = cursor.fetchone()

        if not document:
            raise ValueError("Document not found or inactive")

        document_id_db, organization_id, content = document

        chunks = chunk_text(content)

        # Remove existing chunks so re-ingestion is safe.
        cursor.execute(
            """
            DELETE FROM ai_document_chunks
            WHERE document_id = %s
            """,
            (document_id_db,),
        )

        for index, chunk in enumerate(chunks):
            embedding = await generate_embedding(chunk)

            cursor.execute(
                """
                INSERT INTO ai_document_chunks (
                    document_id,
                    organization_id,
                    chunk_index,
                    content,
                    embedding
                )
                VALUES (%s, %s, %s, %s, %s)
                """,
                (
                    document_id_db,
                    organization_id,
                    index,
                    chunk,
                    embedding,
                ),
            )

        connection.commit()

        return {
            "document_id": str(document_id_db),
            "organization_id": str(organization_id),
            "chunks_created": len(chunks),
        }

    except Exception:
        connection.rollback()
        raise

    finally:
        connection.close()