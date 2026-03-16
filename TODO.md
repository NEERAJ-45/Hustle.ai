# Hustle.ai — Development TODO

## Phase 0: Project Restructure
- [ ] Consolidate `model/` and `ATSs/` under `python_services/` to match planned architecture
- [ ] Move `model/` → `python_services/nlp_service/`
- [ ] Move `ATSs/` → `python_services/auto_apply/`
- [ ] Update all import paths and configs after restructuring
- [ ] Create `docker-compose.yml` at project root

---

## Phase 1: Backend Service Refactor & API Foundation ✅
- [x] Refactor controllers to delegate business logic to service classes in `src/services/`
- [x] Create thin controllers (auth, user, job, resume, coverLetter, dashboard, search, upload, jobMatch, autoApply)
- [x] Implement matching service layer (authService, jobService, userService, etc.)
- [x] Wire up `/jobs/auto-apply` POST endpoint with input validation (stub queue for now)
- [x] Verify all controllers are thin — audit for business logic leaks

---

## Phase 2: Job Queue Integration
- [ ] Install BullMQ + ioredis in `backend/`
- [ ] Set up Redis connection config (`src/config/queue.config.js`)
- [ ] Implement `src/services/queue.service.js` (add job, remove job, job status)
- [ ] Update `/jobs/auto-apply` endpoint to enqueue jobs via BullMQ
- [ ] Create a simple consumer/worker that logs jobs for testing
- [ ] Add Bull Board or basic queue dashboard for monitoring
- [ ] Add Redis connection to `.env` and document setup

---

## Phase 3: Python Worker & Microservice Bootstrapping
- [ ] Create `python_services/auto_apply/queue_worker.py` — Redis/BullMQ consumer
- [ ] Wire worker to consume jobs queued by the backend
- [ ] Verify FastAPI NLP service (`/ml/analyze-job` or `/api/v1/jobmatches/{user_id}`) works end-to-end
- [ ] Verify Flask ATS service (`/generate-v2`, `/extract-keywords`) works end-to-end
- [ ] Add structured logging to the worker for each pipeline step
- [ ] Write integration test: backend enqueues → worker consumes → logs output

---

## Phase 4: Data Aggregation & ML Integration
- [ ] Update Python worker to fetch user profile + job data from MongoDB (or backend API)
- [ ] Integrate NLP microservice call from worker (`POST /ml/analyze-job`)
- [ ] Process NLP output (match scores, keyword analysis) in the worker pipeline
- [ ] Add robust error handling for each pipeline step (DB fetch, ML call, etc.)
- [ ] Add structured logging with job ID context at every step

---

## Phase 5: Document Generation & Storage
- [ ] Integrate ATS resume generator into the worker pipeline
- [ ] Implement LaTeX template filling → PDF generation (already in `ATSs/`)
- [ ] Define PDF storage strategy (local `/generated/` + MongoDB reference)
- [ ] Store generated PDFs and return paths/URLs to the worker
- [ ] Add cover letter generation to the pipeline
- [ ] API endpoint to download/serve generated documents

---

## Phase 6: Job Application Submission
- [ ] Define target platforms for auto-apply (pick 1 to start)
- [ ] Implement job application submission logic in the Python worker
- [ ] Attach generated resume + cover letter PDFs to submissions
- [ ] Handle platform-specific auth (cookies, OAuth, API keys)
- [ ] Log submission result (success/fail/pending) back to MongoDB
- [ ] Update application status in `Application.model.js`
- [ ] Handle rate-limiting and anti-bot protections gracefully

---

## Phase 7: Reliability, Security & Observability
- [ ] Add retry logic (exponential backoff) for failed jobs in the worker
- [ ] Implement dead-letter queue for permanently failed jobs
- [ ] Input validation for all endpoints and worker steps
- [ ] Secure inter-service calls (API keys or JWT between services)
- [ ] Rate-limit all public-facing API endpoints
- [ ] Centralize logging across all services (format, destination, log levels)
- [ ] Add health-check standard response format across all services
- [ ] Add monitoring/alerting for queue depth, error rates, latency

---

## Phase 8: Documentation & DevOps
- [ ] Update `README.md` to reflect current architecture and setup
- [ ] Add `README.md` for each service (`backend/`, `python_services/*`)
- [ ] Write `API_DOCUMENTATION.md` covering all REST endpoints
- [ ] Create `docker-compose.yml` (backend + frontend + Redis + Python services + MongoDB)
- [ ] Provide example `.env` files for each service
- [ ] Add CI/CD pipeline config (GitHub Actions)
- [ ] Document local dev setup (install, seed data, run all services)

---

## Cross-Cutting / Ongoing
- [ ] Keep frontend dashboard in sync with backend API changes
- [ ] Write unit tests for services as they're built (Jest for backend, pytest for Python)
- [ ] Maintain Postman collection (`HustleAI.postman_collection.json`) with new endpoints
- [ ] Keep `map/` app data sources updated as job data schema evolves
