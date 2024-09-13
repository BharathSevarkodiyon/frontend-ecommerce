import React, { useEffect, useState } from "react";
import { useAuth } from "../Provider/AuthContext";
import { useOrders } from "../Provider/OrderProvider";
import { useCart } from "../Provider/CartProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import { useProducts } from "../Provider/ProductProvider";
import CartNavbar from "../navbar/CartNavbar";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton from shadcn

const Orders = () => {
  const { user } = useAuth();
  const { orders } = useOrders();
  const { products } = useProducts();
  const { getCart, clearCart, cartDetails } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true); // State for loading
  const [orderItems, setOrderItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const searchParams = new URLSearchParams(location.search);
  const cartId = searchParams.get("cartId");

  useEffect(() => {
    if (user && cartId) {
      setLoading(true); // Set loading to true while fetching data
      getCart(user._id).then(() => {
        // Find and display order items
        const specificCart = cartDetails.find(
          (cart) => cart._id === cartId && cart.created_by === user._id
        );

        if (specificCart) {
          const updatedOrder = specificCart.productDetails.map((orderItem) => {
            const product = products.find(
              (p) => p._id === orderItem.product_id
            );

            return {
              product_id: orderItem.product_id,
              productName: product ? product.productName : "Unknown Product",
              orderedQuantity: orderItem.orderedQuantity,
              sellingPrice: product ? orderItem.sellingPrice : "0.00",
              mainImage: product ? product.mainImage : "",
              individualPrice: product
                ? (orderItem.sellingPrice / orderItem.orderedQuantity).toFixed(
                    2
                  )
                : "0.00", // Calculate individual product price
            };
          });
          setOrderItems(updatedOrder);

          // Calculate the total amount for the order
          const total = updatedOrder.reduce(
            (sum, item) => sum + item.sellingPrice,
            0
          );
          setTotalAmount(total.toFixed(2));

          // Clear the cart after displaying order items
          clearCart(specificCart._id);
        }
        setLoading(false); // Set loading to false after fetching data
      });
    }
  }, [user, cartId, products]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <CartNavbar />
      <div className="container mx-auto p-4 mt-16 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          Your Orders
        </h1>

        {/* Show success message */}
        {cartId && (
          <div className="flex items-center mb-6 justify-center">
            <BsCheckCircle className="text-green-500 text-lg md:text-3xl mr-2" />
            <p className="text-green-700 text-lg md:text-lg font-semibold">
              Successfully placed the order!
            </p>
          </div>
        )}

        {/* Display loading skeleton when loading is true */}
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2 mx-auto" /> {/* Skeleton for heading */}
            <Skeleton className="h-24 w-full" /> {/* Skeleton for order block */}
            <Skeleton className="h-24 w-full" /> {/* Skeleton for order block */}
            <Skeleton className="h-12 w-1/3 mx-auto" /> {/* Skeleton for total amount */}
          </div>
        ) : orders.length === 0 ? (
          <Alert>
            <AlertTitle>No orders found.</AlertTitle>
          </Alert>
        ) : (
          <div>
            {/* Display Order ID once */}
            <div className="bg-white shadow-md p-5">
              <h2 className="md:text-lg lg:text-xl font-semibold text-gray-700">
                Order ID: <span className="font-normal">{orders._id}</span>
              </h2>
            </div>

            <div>
              {/* Display ordered products */}
              {orderItems.map((item) => (
                <div key={item.product_id} className="bg-white shadow-md p-5">
                  <div className="flex items-center">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={item.mainImage}
                        alt={item.productName}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="md:text-lg font-semibold text-gray-800">
                        {item.productName}
                      </h3>
                      <p className="text-gray-600">
                        Quantity: {item.orderedQuantity}
                      </p>
                      <p className="text-gray-600">
                        Price:{" "}
                        <span className="font-medium">
                          ₹{item.individualPrice}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Display total amount for the order */}
            {orderItems.length > 1 && (
              <div className="bg-white shadow-md p-5">
                <h2 className="md:text-xl font-bold text-gray-700">
                  Total Amount:{" "}
                  <span className="font-medium">₹{totalAmount}</span>
                </h2>
              </div>
            )}
          </div>
        )}

        {/* Thank You Message */}
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold text-gray-700">
            Thank you for your order!
          </p>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => navigate("/")} // Navigate to home page on button click
          >
            Visit BuzzBee to explore more products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
