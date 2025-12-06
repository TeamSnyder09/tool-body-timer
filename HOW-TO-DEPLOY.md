# 🚀 Tool Body Timer - Deployment Guide

Your web application is ready to deploy! Follow these steps to get it online.

## ✅ What's Been Done

- ✅ Git repository initialized and committed
- ✅ Full-stack web application created
- ✅ Backend API with Express.js
- ✅ Frontend with HTML/CSS/JavaScript
- ✅ Multi-user authentication system
- ✅ All dependencies configured

## 📋 Prerequisites

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Choose LTS version (v20.x or higher)
   - Verify installation: Open PowerShell and run `node --version`

2. **Create a GitHub account** (if you don't have one)
   - Go to: https://github.com/signup

## 🌐 Deployment Options

### Option 1: Railway.app (Recommended - Easiest!)

**Why Railway?** Free tier, auto-deploy from GitHub, zero configuration needed!

#### Steps:

1. **Create GitHub Repository**
   ```powershell
   # In PowerShell, run:
   git remote add origin https://github.com/YOUR_USERNAME/tool-body-timer.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Railway**
   - Go to: https://railway.app
   - Click "Start a New Project"
   - Sign in with GitHub
   - Click "Deploy from GitHub repo"
   - Select `tool-body-timer` repository
   - Railway will automatically:
     - Detect it's a Node.js app
     - Run `npm install`
     - Run `npm run build`
     - Start the server
   - Wait 2-3 minutes for deployment

3. **Access Your App**
   - Railway will give you a URL like: `https://tool-body-timer-production.up.railway.app`
   - Click on it to open your live app!

### Option 2: Render.com (Also Free & Easy)

1. **Create GitHub Repository** (same as above)

2. **Deploy to Render**
   - Go to: https://render.com
   - Click "Get Started for Free"
   - Sign in with GitHub
   - Click "New" → "Web Service"
   - Connect your repository
   - Configure:
     - **Name**: tool-body-timer
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
   - Click "Create Web Service"

3. **Access Your App**
   - URL: `https://tool-body-timer.onrender.com`

### Option 3: Heroku

1. **Install Heroku CLI**
   ```powershell
   # Download from: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Deploy**
   ```powershell
   heroku login
   heroku create tool-body-timer
   git push heroku main
   heroku open
   ```

## 🧪 Test Locally First (Optional)

Before deploying, you can test locally:

```powershell
# Install Node.js first, then run:
cd "c:\Users\Kyle\OneDrive\Desktop\New project\tool-body-timer-web"
npm install
npm run build
npm start
```

Then open: http://localhost:3000

## 📱 Using Your App

Once deployed:

1. **Register** a new user (first user should be admin)
2. **Login** with your credentials
3. **Install Tool Bodies** to track
4. **Update Runtime** as tools are used
5. **View Statistics** and reports

## 🔒 Security Notes

- The app uses session tokens for authentication
- All API requests are rate-limited
- CORS and Helmet security enabled
- Data is stored in JSON files (upgradeable to PostgreSQL/MongoDB later)

## 🆘 Troubleshooting

### "npm is not recognized"
- Install Node.js from nodejs.org
- Restart PowerShell after installation

### "Build failed"
- Make sure all files are committed: `git status`
- Check if package.json has correct dependencies

### "App crashes on startup"
- Check Railway/Render logs for errors
- Make sure PORT environment variable is set (auto-set by platforms)

## 📞 Next Steps After Deployment

1. **Share the URL** with your team
2. **Create an admin account** immediately
3. **Set up organizations** if using multi-tenant mode
4. **Start tracking tool bodies!**

## 🎉 You're Done!

Your Tool Body Timer is now accessible online! Anyone with the URL can access it.

**Recommended: Railway.app** - Just push to GitHub and connect Railway. That's it!
