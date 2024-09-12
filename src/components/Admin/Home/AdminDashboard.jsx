import React, { useState } from "react";
import ViewOrders from "../ViewOrders/ViewOrders";
import AdminProduct from "../AdminProduct/AdminProduct";
import AdminCategories from "../AdminCategory/AdminCategories";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaUser, FaSignOutAlt } from "react-icons/fa"; // Import React Icons
import { useAuth } from "@/components/Provider/AuthContext";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products"); // State to track the active tab

  const { logout, user } = useAuth(); // Include logout function and user
  const navigate = useNavigate(); // Initialize useNavigate

  // Logout function
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-1/5 bg-gray-800 text-white flex flex-col justify-between">
        <div>
          <div className="p-4 text-center font-bold text-lg border-b border-gray-700">
            Admin Dashboard
          </div>
          <nav className="flex-grow">
            <ul>
              <li>
                <button
                  onClick={() => setActiveTab("products")}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-700 ${
                    activeTab === "products" ? "bg-gray-700" : ""
                  }`}
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("categories")}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-700 ${
                    activeTab === "categories" ? "bg-gray-700" : ""
                  }`}
                >
                  Product Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-700 ${
                    activeTab === "orders" ? "bg-gray-700" : ""
                  }`}
                >
                  Orders
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Account Details and Logout Button */}
        <div className="p-4 border-t border-gray-700 text-center">
          {user ? (
            <div>
              {/* User Information */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-white h-6 w-6" />
                  <span className="text-white">Welcome, {user.firstName}</span>
                </div>

                {/* Logout Button */}
                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <p className="text-white">No user logged in</p>
          )}

          <div className="mt-4">© 2024 BuzzBee Admin</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-8 bg-purple-100 overflow-y-auto">
        {activeTab === "products" && <AdminProduct />}
        {activeTab === "categories" && <AdminCategories />}
        {activeTab === "orders" && <ViewOrders />}
      </main>
    </div>
  );
};

export default AdminDashboard;
