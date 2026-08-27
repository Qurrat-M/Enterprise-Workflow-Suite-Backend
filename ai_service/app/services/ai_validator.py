import re


def validate_department_answer(answer: str, departments: list[dict]) -> str:
    """
    Validate that the LLM did not contradict authoritative
    department data from PostgreSQL.
    """

    for department in departments:
        name = department["name"]
        code = department["code"]
        status = department["status"]

        # Department name must appear if the LLM mentions this department.
        if name.lower() in answer.lower():

            # Check whether the department code is present correctly.
            if code and code.lower() not in answer.lower():
                answer += f" (Code: {code})"

            # Find common status words near the department name.
            status_pattern = (
                rf"{re.escape(name)}.*?"
                rf"\b(active|inactive|pending|archived|disabled)\b"
            )

            match = re.search(
                status_pattern,
                answer,
                flags=re.IGNORECASE | re.DOTALL,
            )

            if match:
                llm_status = match.group(1).upper()

                if llm_status != status.upper():
                    raise ValueError(
                        f"AI response contains incorrect status for "
                        f"{name}. Expected {status}, got {llm_status}."
                    )

    return answer

def validate_question(question: str) -> str:
    if not question:
        raise ValueError("Question is required")

    question = question.strip()

    if not question:
        raise ValueError("Question cannot be empty")

    if len(question) > 2000:
        raise ValueError("Question is too long")

    return question