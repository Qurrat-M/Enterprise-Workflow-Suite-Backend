import httpx


OLLAMA_URL = "http://127.0.0.1:11434"
MODEL_NAME = "qwen2.5:1.5b"


async def generate_response(prompt: str) -> str:
    try:
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

            answer = data.get("response")

            if not answer:
                raise RuntimeError("Ollama returned an empty response.")

            return answer.strip()

    except httpx.TimeoutException:
        raise RuntimeError("LLM request timed out.")

    except httpx.ConnectError:
        raise RuntimeError("Unable to connect to Ollama.")

    except httpx.HTTPStatusError as error:
        raise RuntimeError(
            f"Ollama returned HTTP {error.response.status_code}."
        )

    except Exception as error:
        raise RuntimeError(f"LLM generation failed: {error}")