import React, { createContext, useContext, useState } from "react";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const openLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const openSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const value = {
    showLoginModal,
    showSignupModal,
    openLogin,
    openSignup,
    closeModals,
    switchToSignup,
    switchToLogin,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}

      {/* Global Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={closeModals}
        onSwitchToSignup={switchToSignup}
      />
      <SignupModal
        isOpen={showSignupModal}
        onClose={closeModals}
        onSwitchToLogin={switchToLogin}
      />
    </ModalContext.Provider>
  );
};
