from app.db import get_connection
from app.services.embedding_service import generate_embedding


async def search_similar_chunks(
    organization_id: str,
    query: str,
    limit: int = 5,
):
    query_embedding = await generate_embedding(query)

    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT
                id,
                document_id,
                content,
                chunk_index,
                1 - (embedding <=> %s::vector) AS similarity
            FROM ai_document_chunks
            WHERE organization_id = %s
              AND embedding IS NOT NULL
            ORDER BY embedding <=> %s::vector
            LIMIT %s
            """,
            (
                query_embedding,
                organization_id,
                query_embedding,
                limit,
            ),
        )

        rows = cursor.fetchall()

        results = []

        for row in rows:
            results.append(
                {
                    "id": str(row[0]),
                    "document_id": str(row[1]),
                    "content": row[2],
                    "chunk_index": row[3],
                    "similarity": float(row[4]),
                }
            )

        return results

    finally:
        connection.close()