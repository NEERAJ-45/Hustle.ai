import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from app.ml.text_preprocessor import build_candidate_text, build_job_text
from app.ml.model_loader import get_model
from app.utils.logger import get_logger

logger = get_logger(__name__)

def rank_jobs_for_candidate(candidate: dict, jobs: list, top_n: int = 5):
    """Core logic: compute embeddings and rank top jobs."""

    model = get_model()
    profile = candidate.get("profile", {})
    candidate_text = build_candidate_text(profile)
    job_texts = [build_job_text(job) for job in jobs]

    if not candidate_text.strip():
        logger.warning(f"Candidate {candidate.get('_id')} missing profile text.")
        return []

    candidate_embed = model.encode([candidate_text], convert_to_numpy=True)
    job_embeds = model.encode(job_texts, convert_to_numpy=True)
    scores = cosine_similarity(candidate_embed, job_embeds)[0]

    top_indices = np.argsort(scores)[::-1][:top_n]
    recommendations = []

    for idx in top_indices:
        job = jobs[idx]
        recommendations.append({
            "jobId": str(job.get("_id", "")),
            "jobTitle": job.get("title", ""),
            "company": job.get("company", {}).get("name", ""),
            "location": job.get("location", {}).get("city", ""),
            "score": round(float(scores[idx]), 3)
        })

    logger.info(f"Generated top {len(recommendations)} matches for candidate {candidate.get('_id', '')}")
    return recommendations
