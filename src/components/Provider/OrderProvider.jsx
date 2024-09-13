// OrderProvider.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  // creating a order details (checkout)
  const createOrder = async (orderData) => {
    try {
      const response = await axios.post(`https://backend-ecommerce-wqir.onrender.com/api/orders`, orderData, {
        withCredentials: true,
      });
      if (response.status === 201) {
        setOrders(response.data);
        // Update orders state after creation
        // fetchOrders(); // Refresh orders after successful creation
        // console.log("Order created successfully!");
      }
    } catch (error) {
      console.error("Error creating order", error);
      throw new Error("Failed to create order.");
    }
  };

  // to show all the order (viewOrder)
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(`https://backend-ecommerce-wqir.onrender.com/api/orders`, {
        withCredentials: true,
      });
      return response.data;
      // setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders', error);
      throw error;
    }
  }, []);

  // to update the status of the order (viewOrder)
  const updateOrderStatus = async (orderId, updatedStatus) => {
    try {
      const response = await axios.put(`https://backend-ecommerce-wqir.onrender.com/api/orders/${orderId}`, {
        status: updatedStatus,
      }, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to update order status", error);
      throw error;
    }
  };

  const fetchOrdersById = useCallback(async (orderId) => {
    try {
      const response = await axios.get(`https://backend-ecommerce-wqir.onrender.com/api/orders/${orderId}`, {
        withCredentials: true,
      });
      return response.data;
      // setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders', error);
      throw error;
    }
  }, []);

  return (
    <OrderContext.Provider value={{ orders, createOrder, fetchOrders, updateOrderStatus, fetchOrdersById }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
