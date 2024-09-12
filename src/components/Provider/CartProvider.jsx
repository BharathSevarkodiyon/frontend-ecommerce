import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartDetails, setCartDetails] = useState(null);
  const [cartData, setCartData] = useState([]); // Store the product details in the cart
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState(null);

  // Helper function to fetch cart details for a specific user
  const getCart = useCallback(async (userId) => {
    try {
      setLoading(true); // Start loading when fetching cart
      // Fetch all cart details
      const response = await axios.get("https://backend-ecommerce-wqir.onrender.com/api/viewcart", {
        withCredentials: true,
        headers: {
          'Cookie': document.cookie
        }
      });
      const carts = response.data;
      setCartDetails(carts)
      // Find the cart matching the given userId
      const userCart = carts.find((cart) => cart.created_by === userId);
      
      if (userCart) {
        setCartId(userCart._id);
        setCartData(userCart.productDetails); // Set product details in state
      } else {
        console.log("No cart found for this user.");
        setCartData([]); // Reset cart data if no cart is found
      }
      setLoading(false); // Stop loading after the fetch operation is completed
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  }, []); // useCallback with empty dependency array

  // Function to create a new cart if it doesn't exist
  const createCart = useCallback(async (userId, productDetails) => {
    try {
      await axios.post("https://backend-ecommerce-wqir.onrender.com/api/viewcart", {
        created_by: userId,
        productDetails: [productDetails], // Add the first product
      }, {
        withCredentials: true,
        headers: {
          'Cookie': document.cookie
        }
      });
      // Fetch the cart again after creation to update the state
      getCart(userId);
    } catch (error) {
      console.error("Error creating cart", error);
    }
  }, [getCart]);

  // Function to update the cart by adding or updating a product
  const updateCartItem = useCallback(async (userId, productDetails) => {
    try {
      // Fetch all carts to find the user's cart
      const response = await axios.get("https://backend-ecommerce-wqir.onrender.com/api/viewcart", {
        withCredentials: true,
        headers: {
          'Cookie': document.cookie
        }
      });
      const carts = response.data;
      const userCart = carts.find((cart) => cart.created_by === userId);

      if (userCart) {
        console.log("got the userCart Details: ", userCart);
        
        const cartId = userCart._id; // Get the cart ID for the user
        const existingProductIndex = userCart.productDetails.findIndex(
          (item) => item.product_id === productDetails.product_id
        );
        console.log("Existing: ", existingProductIndex);

        let updatedProductDetails;
        if (existingProductIndex >= 0) {
          // Update quantity if product already exists in the cart
          updatedProductDetails = [...userCart.productDetails];
          console.log("updated product details: ",updatedProductDetails);
          
          updatedProductDetails[existingProductIndex].orderedQuantity = productDetails.orderedQuantity;
        } else {
          // Add new product if it does not exist
          updatedProductDetails = [...userCart.productDetails, productDetails];
          console.log("else block of update product details: ", updatedProductDetails);
          
        }

        await axios.put(`https://backend-ecommerce-wqir.onrender.com/api/viewcart/${cartId}`, {
          productDetails: updatedProductDetails,
        }, {
          withCredentials: true,
          headers: {
            'Cookie': document.cookie
          }
        });

        // Refresh cart data after update
        getCart(userId);
      } else {
        // If no cart is found, create a new cart
        createCart(userId, productDetails);
      }
    } catch (error) {
      console.error("Error adding/updating cart item", error);
    }
  }, [getCart, createCart]);

  // Function to add or update a cart item
  const addOrUpdateCartItem = useCallback(async (userId, productDetails) => {
    // Update the cart item by first fetching the cart dynamically
    await updateCartItem(userId, productDetails);
  }, [updateCartItem]);

  // Remove an item from the cart
  const removeCartItem = useCallback(async (userId, productId) => {
    try {
      // Fetch all carts to find the user's cart
      const response = await axios.get("https://backend-ecommerce-wqir.onrender.com/api/viewcart", {
        withCredentials: true,
        headers: {
          'Cookie': document.cookie
        }
      });
      const carts = response.data;
      const userCart = carts.find((cart) => cart.created_by === userId);

      if (userCart) {
        const cartId = userCart._id; // Get the cart ID for the user
        const updatedProductDetails = userCart.productDetails.filter(
          (item) => item.product_id !== productId
        );

        await axios.put(`https://backend-ecommerce-wqir.onrender.com/api/viewcart/${cartId}`, {
          productDetails: updatedProductDetails,
        }, {
          withCredentials: true,
          headers: {
            'Cookie': document.cookie
          }
        });

        // Refresh cart after removal
        getCart(userId);
      } else {
        console.log("No cart found for this user to remove item from.");
      }
    } catch (error) {
      console.error("Error removing cart item", error);
    }
  }, [getCart]);

  const clearCart = async (cartId) => {
    try {
      // Clear the cart in the backend by cart ID
      await axios.delete(`https://backend-ecommerce-wqir.onrender.com/api/viewcart/${cartId}`, {
        withCredentials: true,
        headers: {
          'Cookie': document.cookie
        }
      }); // Example endpoint

      // Clear the cart in the frontend state
      setCartDetails([]);
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Load cart data on component mount
  useEffect(() => {
  //   const userId = localStorage.getItem("userId"); // Assuming the user ID is stored in local storage
    const userId = Cookies.get("user_id");
    if (userId) {
      getCart(userId); // Fetch cart details on mount
    }
  }, [getCart]);


  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const userId = Cookies.get("user_id"); // Get user_id from cookie
  //     if (userId && !user) {
  //       await fetchUserById(userId); // Fetch user data using fetchUserById
  //     }
  //   };

  //   fetchUserData();
  // }, [fetchUserById, user]);

  const contextValue = {
    cartData,
    loading,
    cartId,
    cartDetails,
    cartItems,
    addToCart,
    getCart,
    addOrUpdateCartItem,
    clearCart,
    removeCartItem,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);