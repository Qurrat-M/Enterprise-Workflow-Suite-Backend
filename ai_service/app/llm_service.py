import httpx


OLLAMA_URL = "http://127.0.0.1:11434"
MODEL_NAME = "qwen2.5:1.5b"


async def generate_response(prompt: str) -> str:
    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": False,
            },
        )

        response.raise_for_status()

        data = response.json()

        return data["response"]