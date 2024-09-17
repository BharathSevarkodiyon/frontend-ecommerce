import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBox, FaChevronDown, FaShoppingCart, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../Provider/AuthContext';
import Cookies from 'js-cookie';

const CartNavbar = ({ currentURL }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility

  const { fetchUserById, logout, user } = useAuth();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const redirect = currentURL
  const handleLogin = ()=>{
    navigate(`/login?redirect=${redirect}`);
  }
  
  // Logout function
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = Cookies.get("user_id"); // Get user_id from cookie
      if (userId && !user) {
        await fetchUserById(userId); // Fetch user data using fetchUserById
      }
    };

    fetchUserData();
  }, [fetchUserById, user]);

  return (
    // <div className="flex items-center justify-between px-5 py-3 shadow-md bg-white">
    <div className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 mb-16">

      <div className="container mx-auto flex items-center justify-between py-3 px-4">
          {/* Left section: Logo */}
          <div className="flex items-center space-x-2">
            <button 
              className="text-gray-700 hover:text-black"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <img
              src="https://generated-assets.prod.myninja.ai/be20b773-b2c7-4e6e-ae7d-0dd29dde7958/cd1eb8f9-fe48-43e9-959b-3ef5da2b6fbd_2.jpeg"
              alt="Logo"
              className="h-10 w-10 rounded-3xl hover:scale-110"
            />
            <span className="text-xl font-semibold text-black">BuzzBee</span>
          </div>

          {/* Right section: Account and Cart Details */}
          <div className="flex items-center space-x-6">
            {/* Account Details / Login Button */}
            {user ? (
              <div className="relative">
                {/* User Information with Dropdown Toggle */}
                <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
                  <FaUser className="text-black h-6 w-6" />
                  <span className="text-black">Welcome, {user.firstName}</span>
                  <FaChevronDown
                    className={`text-black h-4 w-4 transition-transform duration-200 ${
                      dropdownOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute z-30 right-0 mt-2 w-40 bg-white border rounded shadow-lg py-2">
                    <button
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => navigate("/userorders")}
                    >
                      <FaBox className="mr-4" /> Orders
                    </button>
                    <button
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="mr-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // <Link
              //   to="/login"
              //   className="text-black px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none"
              // >
              //   Login / Signup
              // </Link>
              <button 
                onClick={handleLogin}
                className="text-black px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none"
              >
                Login / Signup
              </button>
            )}
          </div>
        </div>
    </div>
  );
};

export default CartNavbar;
