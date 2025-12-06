# Tool Body Time Tracker - Web Application

Multi-user web application for tracking tool body runtime since installation.

## Deployment

### Option 1: Deploy to Railway

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. Go to [Railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect and deploy!

Your app will be live at: `https://YOUR_APP.up.railway.app`

### Option 2: Deploy to Render

1. Push to GitHub (same as above)
2. Go to [Render.com](https://render.com)
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
6. Click "Create Web Service"

Your app will be live at: `https://YOUR_APP.onrender.com`

### Option 3: Deploy to Heroku

```bash
heroku login
heroku create tool-body-tracker
git push heroku main
```

Your app will be live at: `https://tool-body-tracker.herokuapp.com`

## Local Development

```bash
npm install
npm run build
npm start
```

Access at: http://localhost:3000

## Features

- Multi-user authentication
- Role-based access control (Admin, Operator, Viewer)
- Tool body installation tracking
- Runtime monitoring
- Organization management
- Audit logging
- Responsive design

## Tech Stack

- Backend: Node.js + Express
- Frontend: Vanilla JavaScript
- Storage: File-based JSON (easily upgradeable to database)
- Security: Helmet, CORS, Rate Limiting
