import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import UploadReport from "../pages/reports/UploadReport";
import MyReports from "../pages/reports/MyReports";
import MyVitals from "../pages/vitals/MyVitals";
import SharedWithMe from "../pages/share/SharedWithMe";
import Profile from "../pages/profile/Profile";

import ProtectedRoute from "../components/common/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <MyReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vitals"
          element={
            <ProtectedRoute>
              <MyVitals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shared"
          element={
            <ProtectedRoute>
              <SharedWithMe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
