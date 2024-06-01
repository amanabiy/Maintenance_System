import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ requiredRoles }) => {
  const userRole = localStorage.getItem("role");

  console.log("userRole", userRole);

  if (!requiredRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
