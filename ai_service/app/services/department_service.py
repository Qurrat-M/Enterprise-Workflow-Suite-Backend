from app.db import get_connection


def get_departments(organization_id: str):
    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    id,
                    name,
                    code,
                    description,
                    status
                FROM departments
                WHERE organization_id = %s
                ORDER BY name ASC
                """,
                (organization_id,),
            )

            rows = cursor.fetchall()

            return [
                {
                    "id": str(row[0]),
                    "name": row[1],
                    "code": row[2],
                    "description": row[3],
                    "status": row[4],
                }
                for row in rows
            ]

    finally:
        connection.close()