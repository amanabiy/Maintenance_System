import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRefreshTokenMutation } from "../redux/features/auth";
import { usePermissions } from "../hooks/PermissionsProvider";

const ProtectedRoute = ({ requiredPermissions }) => {
  const cookies = document.cookie.split(";");
  const [authToken, setAuthToken] = useState(
    (() => {
      const cookie = cookies.find((cookie) =>
        cookie.trim().startsWith("authToken=")
      );
      return cookie ? cookie.split("=")[1] : null;
    })()
  );
  const [refreshToken, setRefreshToken] = useState(
    (() => {
      const cookie = cookies.find((cookie) =>
        cookie.trim().startsWith("refreshToken=")
      );
      return cookie ? cookie.split("=")[1] : null;
    })()
  );
  const userRole = localStorage.getItem("role");
  const roleId = localStorage.getItem("roleId");
  const permissions = usePermissions();
  // redux
  const [refreshTokenMutation, { data: refreshData, isSuccess, isError }] =
    useRefreshTokenMutation();

  const defineNewAuthToken = (newAuthToken) => {
    setAuthToken(newAuthToken);
    const expires = new Date();
    expires.setTime(expires.getTime() + 1 * 60 * 60 * 1000); // 1 hour expiry
    document.cookie = `authToken=${newAuthToken}; path=/; expires=${expires.toUTCString()}; secure; samesite=strict`;
  };
  useEffect(() => {
    if (!authToken && refreshToken) {
      refreshTokenMutation(refreshToken);
    }
  }, [authToken, refreshToken, refreshTokenMutation]);

  useEffect(() => {
    if (isSuccess && refreshData) {
      const newAuthToken = refreshData.accessToken;
      defineNewAuthToken(newAuthToken);
    }
    if (isError) {
      localStorage.removeItem("role");
      localStorage.removeItem("roleId");
      localStorage.removeItem("permissions");
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      return <Navigate to="/" replace />;
    }
  }, [isSuccess, refreshData, isError]);

  // console.log(userRole, permissions);

  if (!authToken && !refreshToken) {
    return <Navigate to="/" replace />;
  }

  if (
    requiredPermissions &&
    !requiredPermissions.every((permission) => permissions.includes(permission))
  ) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
