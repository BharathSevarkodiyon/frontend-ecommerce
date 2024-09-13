import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUser, setAllUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateUser = (updatedUser) => {
    setUser(updatedUser); // Update user information
  };
  useEffect(()=>{
    fetchUser()
  },[])

// To find the who ordered the product, fetching all the user and found who ordered the product
  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://backend-ecommerce-wqir.onrender.com/user`, {
        withCredentials: true,
      });
      // console.log(response.data);
      setAllUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setAllUser(null);
    }
    setLoading(false);
  })

    // Fetch user details on app load
    const fetchUserById = useCallback(async (userId) => {
      setLoading(true);
      try {
        const response = await axios.get(`https://backend-ecommerce-wqir.onrender.com/user/${userId}`);
        // console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
      setLoading(false);
    })

    const login = async (email, password) => {
      setLoading(true);
      try {
        const response = await axios.post("https://backend-ecommerce-wqir.onrender.com/login", { email, password });
        const userData = response.data.data;
        const userToken = response.data.token;
        setUser(userData);
        
        Cookies.set("user_id", userData._id, { expires: 0.25, sameSite: 'Lax' }); // Expires in 6 hours
        Cookies.set("user_role", userData.role, { expires: 0.25, sameSite: 'Lax' });
        Cookies.set("authToken", userToken, { expires: 0.25, sameSite: 'Lax' });
        
        // console.log(userData);
        // console.log(response.data.token);
        setLoading(false);
  
        toast.success("Logged in successfully!");
        setTimeout(()=>{
          navigate("/");
        }, 3000);
  
      } catch (error) {
        console.error("Error logging in:", error);
        setLoading(false);
  
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message); // Display error message from backend
        } else {
          toast.error("An error occurred during signup. Please try again."); // Generic error message
        }
      }
    };
  

  const signup = async (signupData) => {
    setLoading(true);
    try {
      const response = await axios.post("https://backend-ecommerce-wqir.onrender.com/signup", signupData);
      if (response.status === 201) {
        setUser(response.data);
        setLoading(false);
        toast.success("Account created successfully!");
        setTimeout(()=>{
          navigate("/login");
        }, 3000)
      } else {
        console.error("Signup failed", response.status);
        setLoading(false);
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setLoading(false);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message); // Display error message from backend
      } else {
        toast.error("An error occurred during signup. Please try again."); // Generic error message
      }
    }
  };

  const logout = async () => {
    setUser(null);
    Cookies.remove("user_id");
    Cookies.remove("user_role");
    Cookies.remove("authToken");
    await axios.post("https://backend-ecommerce-wqir.onrender.com/logout", {
      withCredentials: true,
    });
  };

  const value = {
    user,
    allUser,
    loading,
    fetchUserById,
    fetchUser,
    updateUser,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);