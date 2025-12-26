🩺 DIGITAL HEALTH WALLET

📌 Project Overview

* Digital Health Wallet is a full-stack web application that allows users to securely store, manage, and share medical records and health vitals in one centralized digital platform.
* The idea is similar to a digital wallet, but instead of money, it stores health data such as medical reports, lab tests, X-rays, and vitals like BP and sugar levels.
* This system eliminates the need to carry physical medical reports and enables easy access, tracking, and secure sharing of health information.
__________________________________________________________________________________________________________________________________

🎯 Project Objective

The main objectives of this project are:

* To provide a secure digital space for storing medical records
* To allow users to upload, view, filter, and manage health reports
* To track health vitals over time
* To enable secure sharing of reports with doctors or family members
* To implement authentication and authorization using JWT
* To follow MVC architecture for clean, scalable, and maintainable code

__________________________________________________________________________________________________________________________________

🧠 Core Idea
* “Instead of carrying physical medical reports, users can store all their health data digitally and access it anytime, anywhere.”
* The application acts as a personal health repository, giving users complete control over their medical information.

__________________________________________________________________________________________________________________________________
```
🏗 System Architecture
The project follows the MVC (Model–View–Controller) architecture.
React (Frontend)
   ↓ HTTP Requests (Axios)
Node.js + Express (Backend API)
   ↓
SQLite Database
```

Why MVC?
* Separation of concerns
* Clean and readable code
* Easier debugging and scalability
* Industry-standard architecture

__________________________________________________________________________________________________________________________________

🛠 Tech Stack
* Frontend
* React.js
* React Router DOM
* Axios
* CSS

Backend
* Node.js
* Express.js
* JWT (JSON Web Token)
* Multer (file uploads)
* SQLite3

Tools
* Git & GitHub
* Postman
* VS Code

__________________________________________________________________________________________________________________________________

🔐 Authentication & Security
* User authentication is implemented using JWT
* Protected routes require a valid token
* Passwords are securely handled
* Only authenticated users can:
* Upload reports
* View their reports
* Share reports

__________________________________________________________________________________________________________________________________

✨ Features
👤 User Features
* Register & Login
* Secure authentication using JWT
* User profile management

📄 Medical Reports
* Upload medical reports (PDF, images, etc.)
* Add report type (Blood Test, X-Ray, MRI, etc.)
* Add report date
* Attach vitals (BP, Sugar, etc.)
* Store reports securely in server

🔍 Report Management
* View uploaded reports
* Filter reports by:
* Date
* Report type
* Vitals keywords
* Download stored reports

📤 Sharing
* Share reports securely via email
* Controlled access to reports

📊 Dashboard
* Total reports count
* Vital records count
* Shared reports count

__________________________________________________________________________________________________________________________________

📁 Project Folder Structure
```DIGITAL-HEALTH-WALLET
│
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── reportController.js
│   │   └── userController.js
│   ├── middlewares
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── reportRoutes.js
│   │   └── userRoutes.js
│   ├── uploads
│   │   └── reports
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public
│   └── package.json
│
├── .gitignore
└── README.md
```

__________________________________________________________________________________________________________________________________

⚙️ Backend Explanation (High Level)
1. server.js
* Entry point of backend
* Configures middleware (CORS, JSON parsing)
* Registers API routes
2. config/db.js
* Creates and manages SQLite database connection
3. models
* Defines database schema (users, reports)
4. controllers
* Business logic for authentication, reports, users
5. routes
* API endpoints like:
* /register
* /login
* /reports/upload
* /reports/list
6. middlewares
* JWT authentication check
* File upload validation

__________________________________________________________________________________________________________________________________

🎨 Frontend Explanation (High Level)
1. Components
* Reusable UI components (Navbar, Cards, etc.)
2. Pages
* Login
* Register
3. Dashboard
* Upload Report
* View Reports
4. Services
* Axios API configuration
* Handles backend requests

__________________________________________________________________________________________________________________________________

🔄 Data Flow
1. User interacts with React UI
2. React sends HTTP request using Axios
3. Express server receives request
4. Middleware validates request & token
5. Controller processes logic
6. Database stores or retrieves data
7. Response sent back to frontend
8. UI updates dynamically
__________________________________________________________________________________________________________________________________

🚀 Deployment Steps
🔧 Backend Deployment (Render)
* Push backend code to GitHub
* Create a new Web Service on Render
* Connect GitHub repository
* Set environment variables:
* JWT_SECRET=your_secret_key

* Set start command:
* node server.js
* Deploy backend

🌐 Frontend Deployment (Vercel)
* Push frontend code to GitHub
* Create new project in Vercel
* Import GitHub repository

* Set build command:
* npm run build
* Set output directory:
* dist
* Add backend API URL in environment variables
* Deploy frontend

__________________________________________________________________________________________________________________________________

🧪 Testing
* API tested using Postman
* Manual UI testing for all features
* Authentication and file uploads validated

__________________________________________________________________________________________________________________________________

📈 Future Enhancements
* Role-based access (Doctor / Patient)
* Cloud storage for reports
* Report encryption
* Analytics for vitals
* Mobile app version

__________________________________________________________________________________________________________________________________

👨‍💻 Developer

Name: Srinivas
Project: Digital Health Wallet
Role: Full-Stack Developer

__________________________________________________________________________________________________________________________________

⭐ Conclusion

Digital Health Wallet provides a secure, scalable, and user-friendly way to manage medical data digitally.
The project demonstrates real-world full-stack development, clean architecture, and secure data handling.

__________________________________________________________________________________________________________________________________
⚠️ Note: The backend may take a few seconds to wake up on first request due to Render’s free tier cold start.

