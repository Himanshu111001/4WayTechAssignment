import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      {/* Example of a protected route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute fallback={<Home />}>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Dashboard
                </h1>
                <p className="text-lg text-gray-600">
                  Welcome to your protected dashboard!
                </p>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
      {/* Add more protected routes as needed */}
    </RouterRoutes>
  );
};

export default Routes;
