%% Mermaid Diagram: Hustle.ai Auto Apply Architecture

flowchart TD
    FE[Frontend]
    BE[Backend API (Node.js, JS)]
    Q[Job Queue (Redis/RabbitMQ)]
    PY[Python Worker (Auto Apply Pipeline)]
    NLP[NLP Microservice (Python)]
    DOC[Document Generator (Python, LaTeX)]
    APPLY[Job Apply Service (Python)]
    DB[(Database)]

    FE -- POST /jobs/auto-apply --> BE
    BE -- Enqueue Job --> Q
    Q -- Consume Job --> PY
    PY -- Fetch user/job data --> DB
    PY -- POST /ml/analyze-job --> NLP
    PY -- POST /documents/generate --> DOC
    PY -- POST /jobs/apply --> APPLY
    DOC -- Store PDFs --> PY
    NLP -- Analysis Result --> PY
    APPLY -- Application Status --> PY
    PY -- Status Update --> BE
    BE -- Status Update --> FE
