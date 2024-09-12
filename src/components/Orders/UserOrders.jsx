import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../Provider/AuthContext";
import { useProducts } from "../Provider/ProductProvider";
import { useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs"; // Import Green Tick Icon
import CartNavbar from "../navbar/CartNavbar";
import axios from "axios"; // Import axios

const UserOrders = () => {
  const { user } = useAuth();
  const { products } = useProducts();
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Fetch orders from API
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(`https://backend-ecommerce-wqir.onrender.com/api/orders`, {
        withCredentials: true,
        headers: {
          'Cookie': document.cookie
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching orders", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (user) {
        try {
          const allOrders = await fetchOrders(); // Fetch all orders
          const userOrders = allOrders.filter(
            (order) => order.created_by === user._id // Filter orders by user ID
          );

          setOrderItems(userOrders); // Store filtered orders
        } catch (error) {
          console.error("Error fetching user orders", error);
        }
      }
    };

    fetchUserOrders(); // Fetch user orders when component mounts
  }, [user, fetchOrders]); // Add dependencies for effect

  return (
    <div className="bg-gray-100 min-h-screen">
      <CartNavbar />
      <div className="container mx-auto p-4 md:p-8 mt-16">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-800">
          Your Orders
        </h1>

        {orderItems.length === 0 ? (
          <p className="text-center text-gray-600">No orders found.</p>
        ) : (
          <div className="space-y-8">
            {orderItems.map((order) => {
              // Calculate total amount for each order
              const totalAmount = order.productDetails.reduce((sum, item) => sum + item.sellingPrice, 0);

              return (
                <div key={order._id} className="bg-white shadow-md rounded-lg p-6">
                  <h2 className="text-lg lg:text-xl font-semibold mb-4 text-gray-700">
                    Order ID: <span className="font-normal">{order._id}</span>
                  </h2>
                  {/* Display Order Created Date */}
                  <p className="text-gray-600 mb-2">
                    Ordered On: {formatDate(order.createdAt)} {/* Display formatted createdAt */}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Order Status: {order.status}
                  </p>
                  <p className="text-gray-600 mb-4">
                    Mode of Payment: {order.paymentMethod}
                  </p>

                  {/* Display ordered products */}
                  {order.productDetails.map((item) => {
                    const product = products.find((p) => p._id === item.product_id);
                    const individualPrice = product ? (item.sellingPrice / item.orderedQuantity).toFixed(2) : "0.00"; // Calculate individual price

                    return (
                      <div key={item.product_id} className="flex items-center mb-4">
                        <div className="w-20 h-20 flex-shrink-0">
                          <img
                            src={product ? product.mainImage : ""}
                            alt={product ? product.productName : "Unknown Product"}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="md:text-lg font-semibold text-gray-800">
                            {product ? product.productName : "Unknown Product"}
                          </h3>
                          <p className="text-gray-600">Quantity: {item.orderedQuantity}</p>
                          <p className="text-gray-600">
                            Price: <span className="font-medium">₹{individualPrice}</span>
                          </p>
                          {/* <p className="text-gray-600">
                            Total Price: <span className="font-medium">₹{item.sellingPrice}</span>
                          </p> */}
                        </div>
                      </div>
                    );
                  })}

                  {/* Display total amount if more than one product */}
                  {order.productDetails.length > 1 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Total Amount: <span className="font-normal">₹{totalAmount.toFixed(2)}</span>
                      </h3>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
