**🏥 Digital Health Wallet
**
A Digital Health Wallet is a full-stack web application that allows users to securely store, manage, track, and share medical records and health vitals in one centralized platform — just like a digital wallet, but for health data.
Instead of carrying physical medical reports such as blood tests, X-rays, or prescriptions, users can upload and access them anytime, anywhere.

**🚀 Features
**🔐 User Authentication
Secure Register & Login using JWT (JSON Web Tokens)

📄 Medical Report Management
Upload reports (Blood Test, X-Ray, MRI, etc.)
Store report date, type, and vitals

❤️ Health Vitals Tracking
Track vitals like BP, Sugar, etc.

🔍 Advanced Filtering
Filter reports by date, type, and vitals keywords

📤 Secure Report Sharing
Share medical reports with doctors or family via email

👤 Profile Management

Manage user profile and credentials

🧱 MVC Architecture
Clean, scalable, and maintainable codebase

🛠️ Tech Stack
Frontend
React.js
Vite
Axios
React Router DOM
CSS

Backend
Node.js
Express.js
SQLite
JWT Authentication
Multer (for file uploads)

Deployment
Frontend → Vercel
Backend → Render

📂 Project Structure
```digital-health-wallet/
│
├── backend/
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Business logic
│   │   ├── models/        # Database schemas
│   │   ├── routes/        # API endpoints
│   │   ├── middlewares/   # Auth & validations
│   │   └── server.js      # App entry point
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── vercel.json
│   └── package.json
│
└── README.md
```

🔑 Authentication Flow
User registers or logs in
Backend generates a JWT token
Token is sent with each request via headers
Protected routes are accessed only after token verification

🌐 API Overview (Backend)
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
POST	/api/reports/upload	Upload medical report
GET	/api/reports	Fetch reports
POST	/api/reports/share	Share reports
GET	/api/user/profile	User profile
⚙️ Environment Variables (Backend)

Create a .env file inside backend/:
PORT=5000
JWT_SECRET=your_secret_key

🧪 Run Locally
Backend
cd backend
npm install
npm start

Frontend
cd frontend
npm install
npm run dev

🚀 Deployment Links
🔹 Frontend (Vercel)
👉 Live URL:
https://your-frontend-project.vercel.app
🔹 Backend (Render)
👉 API Base URL:
https://your-backend-project.onrender.com

⚠️ Important Note

⚠️ Note: The backend may take a few seconds to wake up on first request due to Render’s free tier cold start.
