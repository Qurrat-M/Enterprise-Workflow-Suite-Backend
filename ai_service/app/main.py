from fastapi import FastAPI
from app.api.ai import router as ai_router


app = FastAPI(
    title="BAM AI Service",
    description="AI microservice for Budget & Asset Management",
    version="1.0.0"
)

app.include_router(ai_router)

@app.get("/health")
def health():
    return {
        "success": True,
        "message": "AI service is running"
    }

