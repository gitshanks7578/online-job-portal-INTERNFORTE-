import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import TokenVerify from "./components/TokenVerify.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import TokenVerifynew from "./components/tokenverifynew.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProfile from "./pages/admin/AdminProfile.jsx";
import UserDashboard from "./pages/user/UserDashboard.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UserProfile from "./pages/user/UserProfile.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<TokenVerify />} />
        <Route path="/verify-otp" element={<TokenVerifynew />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/*Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        {/* User Routes*/}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute allowedRole="user">
             <UserProfile/>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

