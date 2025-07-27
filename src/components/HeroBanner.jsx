import React from "react";
import { useNavigate } from "react-router-dom";
import bannerImage from "../assets/banner.png";
import Navbar from "./Navbar";

const HeroBanner = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // You can customize this action - navigate to signup, scroll to content, etc.
    navigate("/signup");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />

      {/* Transparent Navbar Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Navbar />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="text-center text-white max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6 drop-shadow-2xl">
            Welcome to the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-2xl">
              Future
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-200 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Experience innovation like never before with our cutting-edge
            platform designed to transform your digital journey.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleGetStarted}
            className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-semibold text-white transition-all duration-300 ease-out bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Arrow Icon */}
            <svg
              className="ml-3 w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5-5 5M6 12h12"
              />
            </svg>
          </button>

          {/* Optional: Scroll Down Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <p className="text-sm mt-2 hidden sm:block">Scroll Down</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
