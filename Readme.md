 
# HustleAI - *Dominate Your Next Job Hunt*
 

# **AI Job Matching Pipeline — Documentation**


***

## **Overview**

This project delivers a scalable, modular AI-powered job-candidate matching service for production.
It is built using FastAPI (Python), Sentence-BERT embeddings for semantic search, and MongoDB for data persistence.
The service exposes RESTful endpoints to rank and recommend jobs for any candidate in your database, supporting seamless integration with Node.js/Express backends and modern frontend applications.

***

## **Architecture**

```
User Request → FastAPI API → MongoDB (User, Job) → NLP Embedding (SBERT) → Semantic Similarity Matching → Ranked Recommendations → Response
```


### **Main Components**

- **app/main.py**: API Entry point, CORS setup, router inclusion
- **app/config.py**: Configuration via environment variables
- **app/database.py**: MongoDB connection utilities
- **app/ml/model_loader.py**: Singleton loader for Sentence-BERT
- **app/ml/text_preprocessor.py**: Profile/job text construction for embeddings
- **app/ml/matcher.py**: Match computation logic (embeddings, ranking)
- **app/routers/jobmatch.py**: API route for job matching
- **app/utils/logger.py**: Structured logging across service

***

## **Features**

- **Modular Design**: Separation of business, DB, and API logic
- **Production Patterns**: Persistent MongoDB client, singleton model, robust error handling
- **Semantic Matching**: Sentence-BERT for context-aware scoring (beyond keywords)
- **Configurable**: .env file for DB credentials and other secrets
- **Extensible**: Easy to add models, algorithms, monitoring
- **Front-End Ready**: API responds in clean, JSON format for UI integration

***

## **Endpoints**

### **Job Matching**

`GET /api/v1/jobmatches/{user_id}`

- **Input:** `user_id` (MongoDB objectId string, for candidate user)
- **Output:**

```json
{
  "userId": "abcdef123456...",
  "matches": [
    {
      "jobId": "1234567890abcd",
      "jobTitle": "Data Analyst",
      "company": "DataFusion",
      "location": "Pune",
      "score": 0.83
    }
  ]
}
```

Returns top N recommended jobs for the user.

***

## **Environment**

- Python 3.8+
- FastAPI
- MongoDB
- Sentence-BERT (`all-MiniLM-L6-v2` by default)
- Docker/K8s ready (containerizable, stateless)

***

## **Setup \& Running**

1. **Clone repo and enter `model` directory**
2. **Create environment file: `.env`**

```
MONGO_URI=your_connection_string
MONGO_DB=your_db
MODEL_NAME=all-MiniLM-L6-v2
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Run the service**

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

5. **Access**
    - Test endpoint: `http://localhost:8000/api/v1/jobmatches/<user_id>`

***

## **How It Works**

1. **User/Candidate ID is sent in request**
2. **Service loads candidate profile and all active jobs from MongoDB**
3. **Profile and job descriptions/skills are semantically encoded using Sentence-BERT**
4. **Cosine similarity ranks jobs by affinity to candidate's text profile**
5. **Top jobs are returned in response**

***

## **Extending the Pipeline**

- Add additional features to embeddings (education, certifications)
- Support batch queries or job-to-candidate matching
- Integrate model monitoring, metrics, and re-training APIs
- Connect to Node.js/Express with fetch or axios calls
- Add authentication and RBAC for multi-tenancy

***

## **Best Practices Followed**

- **Singleton** model loading
- **Centralized logging** with context and timestamps
- **Strong error handling** (HTTP 404 for missing entities)
- **CORS** for frontend consumption
- **.env configuration**
- **Data validation** and fail-fast responses

***

## **Support \& Maintenance**

- Update requirements.txt for new dependencies
- Schedule regular model upgrades (new NLP models)
- Monitor DB and API logs via logger utility
- Containerize for dev/stage/prod environments

***

## **License**

[MIT] — open source, enterprise friendly.

***

