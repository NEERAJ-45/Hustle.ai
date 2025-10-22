#!/bin/bash
echo "🚀 Starting AI Job Matching Service..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
