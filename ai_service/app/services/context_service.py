from app.services.retrieval_service import search_similar_chunks


async def build_context(
    organization_id: str,
    query: str,
    limit: int = 5,
) -> str:
    results = await search_similar_chunks(
        organization_id=organization_id,
        query=query,
        limit=limit,
    )

    if not results:
        return ""

    context_parts = []

    for index, result in enumerate(results, start=1):
        context_parts.append(
            f"[Source {index}]\n"
            f"{result['content']}"
        )

    return "\n\n".join(context_parts)