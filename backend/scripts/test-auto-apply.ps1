# test-auto-apply.ps1

Write-Host "1. Starting Redis via Docker..." -ForegroundColor Cyan
# Start redis if not running. We'll try to start an existing container or run a new one.
$redisRunning = docker ps -q -f name=redis
if (-not $redisRunning) {
    $redisExists = docker ps -aq -f name=redis
    if ($redisExists) {
        Write-Host "Starting existing redis container..."
        docker start redis
    } else {
        Write-Host "Running new redis container..."
        docker run -d --name redis -p 6379:6379 redis:7-alpine
    }
} else {
    Write-Host "Redis is already running."
}

# Get current script path to find the backend directory
$backendDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

Write-Host "`n2. Starting API Server in a new window..." -ForegroundColor Cyan
Start-Process "pwsh.exe" -ArgumentList "-NoExit", "-Command", "cd '$backendDir'; npm run dev"

Write-Host "Waiting 5 seconds for API server to initialize..."
Start-Sleep -Seconds 5

Write-Host "`n3. Starting Consumer Worker in a new window..." -ForegroundColor Cyan
Start-Process "pwsh.exe" -ArgumentList "-NoExit", "-Command", "cd '$backendDir'; npm run worker:auto-apply"

Write-Host "Waiting 3 seconds for worker to initialize..."
Start-Sleep -Seconds 3

Write-Host "`n4. Sending POST request to /jobs/auto-apply endpoint" -ForegroundColor Cyan
$token = Read-Host "Please enter your JWT Bearer token (without 'Bearer ' prefix)"

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type"  = "application/json"
}

$body = @{
    candidateId = "507f1f77bcf86cd799439011"
    jobId       = "507f1f77bcf86cd799439012"
    resumeUrl   = "https://example.com/resume.pdf"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/v1/jobs/auto-apply" -Method Post -Headers $headers -Body $body
    Write-Host "`nSuccessfully sent request! Response:" -ForegroundColor Green
    $response | ConvertTo-Json | Write-Host
} catch {
    Write-Host "`nError sending request:" -ForegroundColor Red
    $_.Exception.Message | Write-Host
}

Write-Host "`nDone! Look at the two other terminal windows to observe the API and worker logs.`n"
