def build_candidate_text(profile: dict) -> str:
    """Combine bio and skills into readable text."""
    bio = profile.get("bio", "")
    skills = ", ".join([s.get("name", "") for s in profile.get("skills", [])])
    experiences = " ".join([exp.get("title", "") + " " + exp.get("company", "") for exp in profile.get("experience", [])])
    education = " ".join([edu.get("degree", "") + " " + edu.get("fieldOfStudy", "") for edu in profile.get("education", [])])

    return f"{bio}. Skills: {skills}. Experience: {experiences}. Education: {education}".strip()

def build_job_text(job: dict) -> str:
    """Combine description and key skills into text."""
    description = job.get("description", "")
    req_skills = ", ".join([s.get("name", "") for s in job.get("requiredSkills", [])])
    title = job.get("title", "")
    company = job.get("company", {}).get("name", "")
    
    return f"{title} at {company}. Description: {description}. Skills: {req_skills}".strip()
