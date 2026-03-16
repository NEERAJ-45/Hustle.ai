# Hustle.ai Auto Apply System: Development Phase Plan

## Phase 1: Backend Service Refactor & API Foundation
- Refactor backend controllers to delegate business logic to new service classes in `src/services/`.
- Implement a `/jobs/auto-apply` POST endpoint that validates input and enqueues a job (use a stub queue for now).
- Ensure all controllers are thin and only handle HTTP logic.

## Phase 2: Job Queue Integration
- Integrate BullMQ (Redis) or RabbitMQ into the backend.
- Implement a queue service and update `/jobs/auto-apply` to enqueue jobs.
- Create a simple consumer that logs jobs for testing.

## Phase 3: Python Worker & Microservice Bootstrapping
- Create a Python worker that consumes jobs from the queue.
- Scaffold a FastAPI/Flask NLP microservice with a `/ml/analyze-job` endpoint (return a stub response).
- Scaffold a document generator service (stub). The worker should log each step.

## Phase 4: Data Aggregation & ML Integration
- Update the Python worker to fetch user and job data from the database or backend API.
- Integrate the NLP microservice call and process its output.
- Add robust error handling and logging for each pipeline step.

## Phase 5: Document Generation & Storage
- Implement LaTeX template filling and PDF generation in the Python document generator.
- Store generated PDFs in `/generated/` and return their paths to the worker.

## Phase 6: Job Application Submission
- Implement job application submission logic in the Python worker.
- Attach generated PDFs to the submission request.
- Log the result and handle errors.

## Phase 7: Reliability, Security, and Observability
- Add retry logic for failed jobs in the worker.
- Implement input validation for all endpoints and worker steps.
- Secure all API and inter-service calls.
- Centralize logging for observability.

## Phase 8: Documentation & DevOps
- Update all documentation to reflect the new architecture and APIs.
- Add README files for each service.
- Provide Docker Compose and example .env files for local development.
