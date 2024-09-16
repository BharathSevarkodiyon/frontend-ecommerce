import React, { useState, useEffect } from "react";
import { useCart } from "../Provider/CartProvider";
import { useProducts } from "../Provider/ProductProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Provider/AuthContext";
import CartNavbar from "../navbar/CartNavbar";
import { toast, Toaster } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "../ui/skeleton";
import Footer from "../Footer/Footer";

const Cart = () => {
  const { addOrUpdateCartItem, cartData, removeCartItem, getCart, cartId, cartItems } = useCart();
  const { products } = useProducts();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("productId");
  const [cartInitialized, setCartInitialized] = useState(false);
  const [isFetchingCart, setIsFetchingCart] = useState(true); // Loading state for fetching cart
  const [isLoading, setIsLoading] = useState(true); // New loading state for 2-second delay

  // Fetch cart data when the user logs in
  useEffect(() => {
    if (user) {
      setIsFetchingCart(true); // Start fetching cart
      getCart(user._id).then(() => {
        setIsFetchingCart(false); // End fetching cart
      });
    } else {
      setIsFetchingCart(false); // End loading if user is not logged in
    }
  }, [user, getCart]);

  // Add a 2-second loading delay before displaying the cart content
  useEffect(() => {
    if (!isFetchingCart) {
      const delay = setTimeout(() => {
        setIsLoading(false); // End the 2-second delay
      }, 2000); // 2-second delay

      return () => clearTimeout(delay); // Clean up the timeout if the component unmounts
    }
  }, [isFetchingCart]);

  // Add product to cart if it's passed in the URL
  useEffect(() => {
    if (user && productId && !cartInitialized && !isFetchingCart) {
      const product = products.find((product) => product._id === productId);
      if (product) {
        const productDetails = {
          product_id: product._id,
          orderedQuantity: 1,
          sellingPrice: product.sellingPrice.$numberDecimal,
        };
        addOrUpdateCartItem(user._id, productDetails);
        setCartInitialized(true);
      }
    }
  }, [user, productId, products, addOrUpdateCartItem, cartInitialized, isFetchingCart]);

  const handleQuantityChange = (item, change) => {
    const newQuantity = Math.max(1, item.orderedQuantity + change);
    const productDetails = {
      product_id: item.product_id,
      orderedQuantity: newQuantity,
      sellingPrice: item.sellingPrice,
    };
    addOrUpdateCartItem(user._id, productDetails);
  };

  const handleRemoveItem = (item) => {
    toast.custom((t) => (
      <div className="bg-white p-4 w-[500px] rounded-lg shadow-lg">
        <p className="mb-4">Are you sure you want to remove this item from your cart?</p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => {
              removeCartItem(user._id, item.product_id);
              toast.success(`Product has been removed from the cart.`);
              toast.dismiss(t);
            }}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={() => toast.dismiss(t)}
          >
            No
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const calculateTotal = (item) => {
    const product = products.find((p) => p._id === item.product_id);
    return product
      ? (parseFloat(product.sellingPrice.$numberDecimal) * item.orderedQuantity).toFixed(2)
      : "0.00";
  };

  const calculateGrandTotal = () => {
    return cartData
      .reduce((total, item) => {
        const product = products.find((p) => p._id === item.product_id);
        return total + (product
          ? parseFloat(product.sellingPrice.$numberDecimal) * item.orderedQuantity
          : 0);
      }, 0)
      .toFixed(2);
  };

  const handlePlaceOrder = () => {
    if (cartId) {
      navigate(`/checkout/${cartId}`);
    } else {
      console.error("Cart ID is not available");
    }
  };

  return (
    <div className="bg-purple-100 w-screen min-h-screen flex flex-col">
      <Toaster richColors position="bottom-center" expand={false} />
      <CartNavbar />
      <div className="flex-grow mx-auto w-screen p-4 mt-[64px]">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {isFetchingCart || isLoading ? (
          // Display loading skeleton while fetching cart data or during the 2-second delay
          <div className="flex justify-center items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px] md:w-[400px]" />
              <Skeleton className="h-4 w-[180px] md:w-[300px]" />
              <Skeleton className="h-4 w-[180px] md:w-[300px]" />
            </div>
          </div>
        ) : !user ? (
          // Show alert if user is not logged in
          <Alert>
            <AlertTitle>Please Login to your account</AlertTitle>
            <AlertDescription>
              You need to be logged in to view and manage your cart.
            </AlertDescription>
          </Alert>
        ) : cartData.length === 0 ? (
          // Show alert if the cart is empty
          <Alert>
            <AlertTitle>Your cart is empty.</AlertTitle>
          </Alert>
        ) : (
          // Display cart items
          <div>
            {cartData.map((item) => {
              const product = products.find((prod) => prod._id === item.product_id);
              return (
                <div key={item._id} className="flex items-center border-b py-4">
                  {product && (
                    <>
                      <img
                        src={product.mainImage}
                        alt={product.productName}
                        className="w-20 h-20 object-cover mr-4"
                      />
                      <div className="flex-grow">
                        <h2 className="text-lg font-semibold">{product.productName}</h2>
                        <p className="text-gray-600">Price: ₹{product.sellingPrice.$numberDecimal}</p>
                        <div className="flex items-center mt-2">
                          <button
                            className="bg-gray-200 px-2 py-1 rounded"
                            onClick={() => handleQuantityChange(item, -1)}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.orderedQuantity}</span>
                          <button
                            className="bg-gray-200 px-2 py-1 rounded"
                            onClick={() => handleQuantityChange(item, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="font-semibold">
                          Total: ₹{calculateTotal(item)}
                        </p>
                        <button
                          className="text-red-500 mt-2"
                          onClick={() => handleRemoveItem(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
            <div className="mt-4 text-right">
              <p className="text-xl font-bold">
                Grand Total: ₹{calculateGrandTotal()}
              </p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Cart;
