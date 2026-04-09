# CityMate Full-Stack Deployment Guide

## 🚀 Production Deployment (30 minutes)

### 1. Backend (Render.com - FREE)
```
1. Fork repo → https://github.com/Manish6201-g/city_mate
2. Render.com → New Web Service → Connect GitHub repo
3. Build: `npm install`
4. Start: `npm start` (or `node server.js`)
5. Backend URL: https://your-app.onrender.com
```

### 2. Frontend (Netlify - FREE)
```
1. Netlify.com → New site → Import GitHub repo
2. Update agency-premium.html → API_URL = 'YOUR_RENDER_URL'
3. Deploy → Live: https://your-site.netlify.app
```

### 3. MongoDB Atlas (FREE Tier)
```
1. MongoDB Atlas → New cluster (free M0)
2. Update backend/.env → MONGO_URI=mongodb+srv://...
3. Redeploy backend
```

### 4. Environment Variables (backend/.env)
```
MONGO_URI=your-atlas-connection-string
JWT_SECRET=your-super-secret-key-keep-safe
PORT=3001
NODE_ENV=production
```

### 5. Final URLs
```
User Site: https://your-agency-site.netlify.app
Admin: https://your-agency-site.netlify.app/admin-dashboard-connected.html
API: https://your-backend.onrender.com
```

## 🧪 Local Development
```
npm install  # backend
open agency-premium.html
open admin-dashboard-connected.html
cd backend && node server.js  # localhost:3001
```

## 🔐 Admin Login
```
Email: admin@citymate.com
Password: admin123
```

**Production-ready.** Deploy live in 30 minutes! 🚀
