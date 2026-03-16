# Hustle.ai Production Folder Structure

```
/Hustle.ai
│
├── backend/                        # Node.js (JavaScript) API server
│   ├── src/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── jobs.route.js
│   │   │   │   ├── ml.route.js
│   │   │   │   └── documents.route.js
│   │   │   ├── controllers/
│   │   │   │   ├── jobs.controller.js
│   │   │   │   ├── ml.controller.js
│   │   │   │   └── documents.controller.js
│   │   │   └── validations/
│   │   │       ├── jobs.validation.js
│   │   │       ├── ml.validation.js
│   │   │       └── documents.validation.js
│   │   ├── services/
│   │   │   ├── queue.service.js
│   │   │   ├── logger.service.js
│   │   │   └── db.service.js
│   │   ├── middlewares/
│   │   │   ├── error.middleware.js
│   │   │   └── auth.middleware.js
│   │   ├── config/
│   │   │   ├── queue.config.js
│   │   │   └── logger.config.js
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── job.model.js
│   │   │   └── ...
│   │   └── utils/
│   │       ├── validation.util.js
│   │       └── security.util.js
│   ├── package.json
│   ├── README.md
│   └── ...
│
├── python_services/                 # All Python microservices
│   ├── auto_apply/                  # Main Auto Apply pipeline
│   │   ├── main.py                  # Entry point for worker
│   │   ├── queue_worker.py          # Consumes jobs from queue
│   │   ├── job_analysis.py          # Calls NLP microservice
│   │   ├── doc_generator.py         # Generates PDFs
│   │   ├── job_apply.py             # Submits applications
│   │   ├── utils/
│   │   │   ├── latex_utils.py
│   │   │   ├── logger.py
│   │   │   └── retry.py
│   │   ├── templates/
│   │   │   ├── resume_template.tex
│   │   │   └── cover_letter_template.tex
│   │   ├── generated/
│   │   │   ├── resume_<userId>_<jobId>.pdf
│   │   │   └── coverletter_<userId>_<jobId>.pdf
│   │   ├── requirements.txt
│   │   └── README.md
│   │
│   └── nlp_service/                 # Python NLP microservice
│       ├── app.py                   # FastAPI/Flask app
│       ├── services/
│       │   ├── job_analysis.py
│       │   └── ...
│       ├── utils/
│       │   ├── spacy_utils.py
│       │   └── keyword_extractor.py
│       ├── requirements.txt
│       └── README.md
│
├── frontend/                        # Next.js or other frontend
│   └── ...                          # (unchanged)
│
├── docs/                            # Architecture, API docs, etc.
│   ├── API_DOCUMENTATION.md
│   ├── ARCHITECTURE.md
│   ├── PROJECT_SUMMARY.md
│   └── ...
│
├── .env                             # Environment variables
├── docker-compose.yml               # Multi-service orchestration
├── README.md                        # Project overview
└── package.json                     # (if root-level scripts/tools)
```

---

## Key Points
- All backend API logic is in `backend/` (JavaScript, no TypeScript).
- All Python services (Auto Apply pipeline, NLP, Doc Gen) are in `python_services/`.
- LaTeX templates and generated PDFs are managed inside the Python service.
- Each service has its own `requirements.txt` and `README.md`.
- `docs/` holds all documentation and API specs.
- `docker-compose.yml` orchestrates backend, Python services, Redis/RabbitMQ, etc.
