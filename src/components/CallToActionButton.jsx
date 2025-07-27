import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useModal } from "../contexts/ModalContext";

// Example component that can be used anywhere in the app
const CallToActionButton = ({
  children = "Get Started",
  className = "",
  authenticatedText = "Continue",
  authenticatedAction = null, // Custom action for authenticated users
}) => {
  const { isAuthenticated } = useAuth();
  const { openSignup } = useModal();

  const handleClick = () => {
    if (isAuthenticated) {
      // If user is authenticated and there's a custom action, use it
      if (authenticatedAction && typeof authenticatedAction === "function") {
        authenticatedAction();
      }
      // Otherwise, default behavior for authenticated users
    } else {
      // Open signup modal for non-authenticated users
      openSignup();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${className}`}
    >
      {isAuthenticated ? authenticatedText : children}
    </button>
  );
};

export default CallToActionButton;
