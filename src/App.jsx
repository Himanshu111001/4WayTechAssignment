import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalContext";
import Routes from "./routes/Routes";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <div className="min-h-screen bg-black">
            <Routes />
          </div>
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
