import { Alert } from "@mui/material";
import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error, "error in the ERROR BOUNDARY");
  return (
    <div role="alert">
      <Alert severity="error">An error occurred. Please try again later.</Alert>
    </div>
  );
}

export default ErrorBoundary;
