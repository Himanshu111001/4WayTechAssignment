import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useModal } from "../contexts/ModalContext";
import bannerImage from "../assets/banner.png"; // Fallback image
import Navbar from "./Navbar";

const HeroBanner = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { openSignup } = useModal();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  // Handle video load success
  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  // Handle video load error with fallback
  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
    console.warn("Hero video failed to load, falling back to image");
  };

  // Ensure video plays when component mounts (for some browsers)
  useEffect(() => {
    if (videoRef.current && videoLoaded && !videoError) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay was prevented:", error);
          // Video autoplay was prevented, but that's okay
        });
      }
    }
  }, [videoLoaded, videoError]);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // If user is already logged in, you can navigate to a dashboard or main app
      navigate("/dashboard"); // You can create this route or change to any desired action
    } else {
      // Show signup modal for non-authenticated users
      openSignup();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video - Only render if no error occurred */}
      {!videoError && (
        <video
          ref={videoRef}
          className="hero-video absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={bannerImage}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onCanPlay={() => setVideoLoaded(true)}
          data-loaded={videoLoaded}
          aria-hidden="true"
        >
          <source src="/opening.m4v" type="video/mp4" />
          {/* Fallback text for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
      )}

      {/* Fallback Background Image - Shown if video fails or is loading */}
      <div
        className={`hero-video-fallback absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
          videoError || !videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
        role="img"
        aria-label="Hero banner background"
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30 z-[1]" />

      {/* Transparent Navbar Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Navbar />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="text-left text-white max-w-4xl">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 drop-shadow-2xl">
            Real Emotions,
            <span
              className="block drop-shadow-2xl"
              style={{ color: "rgb(255, 252, 84)" }}
            >
              Real Connections
            </span>
          </h1>

          {/* Secondary Heading */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6 sm:mb-8 text-gray-100 drop-shadow-lg">
            Meet Your AI Companion Today
          </h2>

          {/* Paragraph */}
          <p className="text-base sm:text-lg md:text-xl font-light text-gray-200 mb-8 sm:mb-12 max-w-3xl leading-relaxed drop-shadow-lg">
            Engage with real AI companions offering human-like interactions,
            powered by cutting-edge AI technology. Chat with AI girlfriends and
            companions for conversations that feel truly authentic and secure.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleGetStarted}
            className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-semibold text-black transition-all duration-300 ease-out rounded-lg shadow-2xl hover:scale-105 transform focus:outline-none focus:ring-4 focus:ring-yellow-500/50 hover:opacity-80"
            style={{ backgroundColor: "rgb(255, 252, 84)" }}
          >
            <span className="relative z-10">
              {isAuthenticated
                ? `Welcome back, ${user?.firstName}!`
                : "Start Chatting Now"}
            </span>

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
        </div>
      </div>

      {/* Black Strip with Marquee Text */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-black z-20 overflow-hidden">
        <div className="flex items-center h-full">
          <div className="marquee-container">
            <div className="marquee-text text-lg font-medium">
              <span>
                Sign up now and get 5 points for free. App available on iOS and
                Android
              </span>
              <span>
                Sign up now and get 5 points for free. App available on iOS and
                Android
              </span>
              <span>
                Sign up now and get 5 points for free. App available on iOS and
                Android
              </span>
              <span>
                Sign up now and get 5 points for free. App available on iOS and
                Android
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
