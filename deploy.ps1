# Quick Deploy Script for Windows PowerShell

Write-Host "🚀 Tool Body Timer - Deployment Setup" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js is NOT installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js first:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "2. Download and install LTS version" -ForegroundColor Yellow
    Write-Host "3. Restart PowerShell" -ForegroundColor Yellow
    Write-Host "4. Run this script again" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green

# Navigate to project directory
Set-Location "c:\Users\Kyle\OneDrive\Desktop\New project\tool-body-timer-web"

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Installation failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "🔨 Building project..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful" -ForegroundColor Green

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "✅ PROJECT READY FOR DEPLOYMENT!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create a GitHub repository" -ForegroundColor White
Write-Host "2. Push your code:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/tool-body-timer.git" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Deploy to Railway.app:" -ForegroundColor White
Write-Host "   - Go to: https://railway.app" -ForegroundColor Gray
Write-Host "   - Click 'Deploy from GitHub repo'" -ForegroundColor Gray
Write-Host "   - Select your repository" -ForegroundColor Gray
Write-Host "   - Wait 2-3 minutes" -ForegroundColor Gray
Write-Host "   - Your app will be LIVE! 🎉" -ForegroundColor Gray
Write-Host ""
Write-Host "Or test locally first:" -ForegroundColor Yellow
Write-Host "   npm start" -ForegroundColor Gray
Write-Host "   Then open: http://localhost:3000" -ForegroundColor Gray
Write-Host ""
