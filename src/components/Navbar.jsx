import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isHomePage = location.pathname === "/";

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/login", label: "Login" },
    { path: "/signup", label: "Sign Up" },
  ];

  return (
    <nav
      className={`${
        isHomePage ? "bg-transparent" : "bg-white shadow-lg"
      } w-full z-20`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4 lg:py-6">
          <Link to="/" className={`${isHomePage ? "drop-shadow-lg" : ""}`}>
            <img
              src={logo}
              alt="Assignment App Logo"
              className="h-8 sm:h-10 lg:h-12 w-auto"
            />
          </Link>

          <div>
            <Link
              to="/login"
              className="px-4 py-2 lg:px-6 lg:py-3 rounded-md text-sm lg:text-base font-medium transition-all duration-200 text-black hover:opacity-80"
              style={{ backgroundColor: 'rgb(255, 252, 84)' }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
