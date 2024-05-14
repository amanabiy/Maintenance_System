import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import NotAuthorized from "../components/errorPages/NotAuthorized";

// Mock function to get current user's role
const getCurrentUserRole = () => {
  // This should come from your authentication logic
  return "user"; // Example role, replace with actual logic
};

const ProtectedRoute = ({ requiredRoles }) => {
  const userRole = getCurrentUserRole();

  if (!requiredRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
