from app.llm_service import generate_response
from app.services.context_service import build_context


async def answer_with_rag(
    organization_id: str,
    question: str,
) -> str:

    context = await build_context(
        organization_id=organization_id,
        query=question,
        limit=5,
    )

    if not context:
        return "I don't have enough information in the organization's knowledge base to answer this question."

    prompt = f"""
You are an AI assistant for an organization's Budget and Asset Management system.

Answer the user's question using ONLY the provided organization context.

Do not use outside knowledge.
Do not invent or assume information.
If the answer cannot be determined from the context, say:
"I don't have enough information in the organization's knowledge base to answer this question."

Organization Context:
---------------------
{context}
---------------------

User Question:
{question}

Provide a concise and accurate answer.
"""

    return await generate_response(prompt)