# PowerShell script to start both frontend and backend servers

Write-Host "🚀 Starting SkillSwap Application..." -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Start backend server
Write-Host "📦 Starting Backend Server (Port 3002)..." -ForegroundColor Yellow
$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    Set-Location server
    npm start
}

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend server
Write-Host "🎨 Starting Frontend Server (Port 3000)..." -ForegroundColor Yellow
$frontendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    npm run dev
}

Write-Host ""
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📍 Backend:  http://localhost:3002" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host ""

# Wait for user to stop
try {
    Wait-Job -Job $backendJob, $frontendJob
} finally {
    Write-Host "Stopping servers..." -ForegroundColor Yellow
    Stop-Job -Job $backendJob, $frontendJob
    Remove-Job -Job $backendJob, $frontendJob
}
