🩺 Digital Health Wallet

A full-stack web application that allows users to securely store, manage, and share their medical records and health vitals in one place — just like a digital wallet for health data.

This project is built using React.js for the frontend, Node.js + Express.js for the backend, and SQLite as the database, following the MVC architecture.

🚀 Live Demo

Frontend (Vercel):
👉 https://digital-health-wallet-ochre.vercel.app

Backend API (Render):
👉 https://digital-health-wallet-sp88.onrender.com

📌 Features
🔐 Authentication & Security

User registration and login

JWT-based authentication

Protected routes

Password hashing using bcrypt

📄 Medical Reports

Upload medical reports (PDF / Images)

Store reports with type, date, and vitals info

View and delete uploaded reports

Secure file storage using server file system

❤️ Health Vitals

Add vitals such as BP, Sugar, Heart Rate

View vitals history

Track vitals over time

🤝 Report Sharing

Share reports securely via email

Revoke shared access anytime

View reports shared with you

🎨 UI & UX

Clean and responsive UI

Light mode & Dark mode support

Dashboard overview

Filters by date, report type, and vitals keywords

🧱 Tech Stack
Frontend

React.js

React Router

Axios

Context API

CSS (Custom styling)

Backend

Node.js

Express.js

SQLite

Multer (file uploads)

JSON Web Token (JWT)

bcrypt

CORS

Deployment

Frontend: Vercel

Backend: Render

📁 Project Structure

```digital-health-wallet/
│
├── backend/
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Auth & upload middlewares
│   │   ├── routes/        # API routes
│   │   ├── uploads/       # Uploaded medical reports
│   │   ├── server.js      # Express server entry
│   │   └── healthwallet.db
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api/
│   │   └── index.css
│   └── package.json
│
└── README.md
```

🗄️ Database

SQLite database (healthwallet.db)

Tables:

users

reports

vitals

shared_access

📌 Note:

Local development and deployed backend use separate databases

Deployed data cannot be seen in local DB browser

⚙️ Environment Variables

Create a .env file inside the backend folder:

PORT=5000
JWT_SECRET=your_secret_key

▶️ How to Run Locally
1️⃣ Clone the Repository
git clone https://github.com/your-username/digital-health-wallet.git
cd digital-health-wallet

2️⃣ Backend Setup
cd backend
npm install
npm run dev


Backend runs on:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

📤 File Uploads

Reports are stored in:

backend/src/uploads/reports


Access uploaded files via:

http://localhost:5000/uploads/reports/<filename>

🔍 API Overview
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
POST	/api/reports	Upload report
GET	/api/reports	Get user reports
DELETE	/api/reports/:id	Delete report
POST	/api/vitals	Add vitals
GET	/api/vitals	Get vitals
POST	/api/share	Share report
🧠 Architecture

MVC Architecture

Models: Database schema & queries

Controllers: Business logic

Routes: API endpoints

Middlewares handle:

Authentication

File uploads

Authorization

🛡️ Security Highlights

JWT authentication

Password hashing

Protected API routes

CORS configured for trusted origins

File type validation for uploads

🎯 Future Enhancements

Charts for vitals trends

Role-based access (Doctor / Patient)

Email notifications

Cloud storage for reports

Export reports as PDF

👨‍💻 Author
Srinivas
B.Tech CSE (AI)
Full Stack Developer
React • Node.js • Express • SQLite
