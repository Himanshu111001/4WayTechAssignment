import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useModal } from "../contexts/ModalContext";

// Example component that can be used anywhere in the app
const CallToActionButton = ({
  children = "Get Started",
  className = "",
  style = {},
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
      style={style}
      className={`inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200 ${className}`}
    >
      {isAuthenticated ? authenticatedText : children}
    </button>
  );
};

export default CallToActionButton;
