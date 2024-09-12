import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { FaArrowLeft } from "react-icons/fa";

const AuthenticateNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current route

  // Determine the button text and target route
//   const isLoginPage = location.pathname === "/login";
  const buttonText = (location.pathname === "/login" ? "Signup" : "Login")
  const targetRoute = (location.pathname === "/login" ? "/signup" : "/login")

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 text-white flex items-center justify-between px-5 py-3 shadow-md z-50">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        {/* Back Button */}
        <button
          className="text-white hover:text-gray-200"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="text-xl" />
        </button>

        {/* Logo and Company Name */}
        <div className="flex items-center space-x-2">
          <img
            src="https://generated-assets.prod.myninja.ai/be20b773-b2c7-4e6e-ae7d-0dd29dde7958/cd1eb8f9-fe48-43e9-959b-3ef5da2b6fbd_2.jpeg" // Replace with actual logo path
            alt="Logo"
            className="h-8 w-8 object-contain rounded-full hover:scale-110"
          />
          <span className="text-lg font-semibold">BuzzBee</span>
        </div>
      </div>

      {/* Right Side Button */}
      <div>
        <button
          className="bg-white text-indigo-600 px-4 py-1 rounded-md hover:bg-indigo-100"
          onClick={() => navigate(targetRoute)} // Navigate to the target route
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default AuthenticateNavbar;
