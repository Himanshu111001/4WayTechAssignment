import React from "react";
import HeroBanner from "../components/HeroBanner";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      {/* Hero Banner - Full viewport */}
      <HeroBanner />

      {/* Navigation - Fixed overlay */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Main Content Section */}
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              About Our Platform
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              A modern React application with routing and Tailwind CSS
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Features
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• React Router for navigation</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Responsive design</li>
                <li>• Modern component structure</li>
                <li>• Full viewport hero banner</li>
                <li>• Mobile-first approach</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Getting Started
              </h3>
              <p className="text-gray-600 mb-4">
                Navigate through the application using the navigation bar above.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  • Visit Login page to see login form
                </p>
                <p className="text-sm text-gray-500">
                  • Visit Sign Up page to see registration form
                </p>
                <p className="text-sm text-gray-500">
                  • Explore the responsive hero banner
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
