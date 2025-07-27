import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("userData");

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Get stored users from localStorage
      const storedUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );

      // Find user with matching credentials
      const user = storedUsers.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );

      if (user) {
        // Create user session without storing password
        const { password: _, ...userWithoutPassword } = user;
        const token = `token_${Date.now()}_${Math.random()}`;

        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(userWithoutPassword));

        setUser(userWithoutPassword);
        setIsAuthenticated(true);

        resolve({ success: true, user: userWithoutPassword });
      } else {
        reject({ success: false, message: "Invalid email or password" });
      }
    });
  };

  const signup = (userData) => {
    return new Promise((resolve, reject) => {
      const { firstName, lastName, email, password, confirmPassword } =
        userData;

      // Basic validation
      if (!firstName || !lastName || !email || !password) {
        reject({ success: false, message: "All fields are required" });
        return;
      }

      if (password !== confirmPassword) {
        reject({ success: false, message: "Passwords do not match" });
        return;
      }

      if (password.length < 6) {
        reject({
          success: false,
          message: "Password must be at least 6 characters long",
        });
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        reject({
          success: false,
          message: "Please enter a valid email address",
        });
        return;
      }

      // Get existing users
      const storedUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );

      // Check if user already exists
      const existingUser = storedUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        reject({
          success: false,
          message: "User with this email already exists",
        });
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email: email.toLowerCase(),
        password,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      storedUsers.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(storedUsers));

      // Auto-login after signup
      const { password: _, ...userWithoutPassword } = newUser;
      const token = `token_${Date.now()}_${Math.random()}`;

      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(userWithoutPassword));

      setUser(userWithoutPassword);
      setIsAuthenticated(true);

      resolve({ success: true, user: userWithoutPassword });
    });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
