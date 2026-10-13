# 🚀 Starting SkillSwap Application

## Quick Start

You need to run **both** the frontend and backend servers for the application to work.

### Option 1: Manual Start (Recommended for debugging)

**Terminal 1 - Backend Server:**
```powershell
cd server
npm start
```
Backend will start on `http://localhost:3002`

**Terminal 2 - Frontend Server:**
```powershell
npm run dev
```
Frontend will start on `http://localhost:3000`

### Option 2: PowerShell Script

Run the provided script:
```powershell
.\start-servers.ps1
```

## ✅ Verify Servers Are Running

1. **Check Backend**: Open http://localhost:3002/health in your browser
   - Should show: `{"status":"ok","message":"SkillSwap backend is running"}`

2. **Check Frontend**: Open http://localhost:3000 in your browser
   - Should show the SkillSwap landing page

## 🔧 Troubleshooting

### White Screen Issues

1. **Check Browser Console** (F12)
   - Look for any red error messages
   - Common issues:
     - CORS errors (backend not running)
     - Network errors (backend URL mismatch)
     - Import errors (missing dependencies)

2. **Verify Ports**
   - Frontend: Port 3000
   - Backend: Port 3002
   - Check if ports are already in use:
     ```powershell
     netstat -ano | Select-String ":3000"
     netstat -ano | Select-String ":3002"
     ```

3. **Check Environment Variables**
   - Backend needs `GEMINI_API_KEY` in `server/.env.local`
   - Frontend can use `VITE_BACKEND_URL` in `.env.local` (defaults to http://localhost:3002)

4. **Install Dependencies**
   ```powershell
   # Frontend
   npm install
   
   # Backend
   cd server
   npm install
   ```

## 📝 Notes

- The frontend will work even if the backend is down (with limited functionality)
- Backend is required for AI features (matchmaking, chat responses)
- The application includes error boundaries to show helpful error messages instead of white screens
