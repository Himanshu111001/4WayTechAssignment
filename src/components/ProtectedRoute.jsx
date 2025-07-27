import React from "react";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, fallback = null }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback;
  }

  return children;
};

export default ProtectedRoute;
