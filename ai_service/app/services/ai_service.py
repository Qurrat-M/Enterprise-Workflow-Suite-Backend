from app.llm_service import generate_response
from app.services.department_service import get_departments
from app.services.ai_validator import validate_department_answer

async def analyze_question(question: str, organization_id: str) -> str:
    departments = get_departments(organization_id)

    if departments:
        department_context = "\n".join(
            [
                f"- Name: {department['name']}\n"
                f"  Code: {department['code']}\n"
                f"  Status: {department['status']}\n"
                f"  Description: {department['description']}"
                for department in departments
            ]
        )
    else:
        department_context = "No departments were found."

    prompt = f"""
You are an AI assistant for a Budget & Asset Management system.

Your job is to answer the user's question using the database context.

USER QUESTION:
{question}

DATABASE CONTEXT:
Departments:
{department_context}

STRICT RULES:
1. Treat the DATABASE CONTEXT as authoritative.
2. Never change, infer, or guess database values.
3. Preserve department names, codes, and statuses exactly as provided.
4. If a department status is INACTIVE, do not describe it as active.
5. Do not invent information that is not present in the database context.
6. If the requested information is not available in the database context, say that it is not available.
7. Do not use general knowledge to override database information.
8. Answer clearly and concisely.
"""

    answer = await generate_response(prompt)

    return validate_department_answer(
    answer=answer,
    departments=departments,
)