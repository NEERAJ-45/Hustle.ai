from fastapi import APIRouter, HTTPException
from bson import ObjectId
from bson.errors import InvalidId
from app.database import get_collection
from app.ml.matcher import rank_jobs_for_candidate
from app.utils.logger import get_logger

router = APIRouter(prefix="/api/v1/jobmatches", tags=["Job Matching"])
logger = get_logger(__name__)

@router.get("/{user_id}")
def match_candidate_jobs(user_id: str):
    """Fetch user, compute matches, and return recommendations."""

    try:
        obj_id = ObjectId(user_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    users = get_collection("users")
    jobs = get_collection("jobs")

    # Validate user
    candidate = users.find_one({"_id": obj_id})
    if not candidate:
        raise HTTPException(status_code=404, detail="User not found")

    # Get active jobs
    active_jobs = list(jobs.find({"isActive": True}, {"_id": 1, "title": 1, "company": 1, "description": 1, "requiredSkills": 1, "location": 1}))
    if not active_jobs:
        raise HTTPException(status_code=404, detail="No active jobs found")

    results = rank_jobs_for_candidate(candidate, active_jobs, top_n=5)
    if not results:
        return {"userId": user_id, "matches": [], "message": "No matching jobs found"}

    return {"userId": user_id, "matches": results}
