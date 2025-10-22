from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import jobmatch
from app.utils.logger import get_logger

logger = get_logger(__name__)
app = FastAPI(title="AI Job Matching Service", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(jobmatch.router)

@app.get("/")
def root():
    return {"message": "AI Job Matcher is running successfully."}

logger.info("FastAPI Job Matcher initialized.")
