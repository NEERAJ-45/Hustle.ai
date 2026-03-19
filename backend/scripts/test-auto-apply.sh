#!/bin/bash

echo -e "\033[36m1. Starting Redis via Docker...\033[0m"
if [ -z "$(docker ps -q -f name=redis)" ]; then
    if [ -n "$(docker ps -aq -f name=redis)" ]; then
        echo "Starting existing redis container..."
        docker start redis
    else
        echo "Running new redis container..."
        docker run -d --name redis -p 6379:6379 redis:7-alpine
    fi
else
    echo "Redis is already running."
fi

# Get the script directory to reliably navigate to backend
SCRIPT_DIR="$(dirname "$0")"
cd "$SCRIPT_DIR/.." || exit

echo -e "\n\033[36m2. Starting API Server in the background...\033[0m"
npm run dev &
API_PID=$!

echo "Waiting 5 seconds for API server to initialize..."
sleep 5

echo -e "\n\033[36m3. Starting Consumer Worker in the background...\033[0m"
npm run worker:auto-apply &
WORKER_PID=$!

echo "Waiting 3 seconds for worker to initialize..."
sleep 3

echo -e "\n\033[36m4. Sending POST request to /jobs/auto-apply endpoint\033[0m"
echo "Generating a temporary JWT token..."
# We use node to generate a token with the candidateId
# We grep for 'eyJ' (the standard JWT prefix) to ensure verbose module logs (like dotenv tips) aren't mixed into the token variable.
token=$(node -e "
const jwt = require('jsonwebtoken');
require('dotenv').config({ debug: false });
const payload = { id: '507f1f77bcf86cd799439011', role: 'candidate' };
// Fallback to 'secret' if JWT_SECRET is not in .env
console.log(jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' }));
" | grep -oE "^eyJ.*")

echo "Generated Token: $token"

echo -e "\nSending request..."
response=$(curl -s -w "\n%{http_code}" -X POST http://localhost:5000/api/v1/jobs/auto-apply \
  -H "Authorization: Bearer $token" \
  -H "Content-Type: application/json" \
  -d "{
  \"candidateId\": \"507f1f77bcf86cd799439011\",
  \"jobId\": \"507f1f77bcf86cd799439012\",
  \"resumeUrl\": \"file://$SCRIPT_DIR/../Resume.pdf\",
  \"template\": \"software-engineer-v1\"
}")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

echo "Response Body:"
echo "$body" | node -e "
let input = '';
process.stdin.on('data', d => input += d);
process.stdin.on('end', () => {
  try { 
    if(input.trim()) {
      console.log(JSON.stringify(JSON.parse(input), null, 2)); 
    } else {
      console.log('No content');
    }
  }
  catch(e) { console.log(input); }
});"

echo -e "\n\033[36mHTTP Status Code (ACK):\033[0m \033[33m$http_code\033[0m"

echo -e "\n\n\033[32mDone! The request was sent.\033[0m"
echo -e "\033[33mPress Ctrl+C at any time to stop the API and Worker.\033[0m"

# Trap SIGINT (Ctrl+C) to clean up background processes
trap "echo -e '\n\033[31mStopping API ($API_PID) and Worker ($WORKER_PID)...\033[0m'; kill $API_PID $WORKER_PID 2>/dev/null; exit 0" SIGINT SIGTERM

# Keep the script running so you can observe the logs. Wait for all background processes.
wait
