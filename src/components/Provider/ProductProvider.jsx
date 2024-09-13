import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/product/`, {
        withCredentials: true,
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  })

  // Create a new product
  const createProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/product/`,
        newProduct, {
          withCredentials: true,
        }
      );
      setProducts((prevProducts) => [...prevProducts, response.data]); // Add the new product to the state
    } catch (error) {
      console.error("Error creating product", error);
    }
  };

  // Update a product by ID
  const updateProductById = async (productId, updatedProduct) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/product/${productId}`,
        updatedProduct, {
          withCredentials: true,
        }
      );
      setProducts((prevProducts) =>
        prevProducts.map(
          (product) => (product.id === productId ? response.data : product) // Update the product in the state
        )
      );
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  // Delete a product by ID
  const deleteProductById = async (productId) => {
    try {
      await axios.delete(`${baseUrl}/api/product/${productId}`, {
        withCredentials: true,
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      ); // Remove the deleted product from the state
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const createCategory = async (categoryData) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/productCategory/`,
        categoryData, {
          withCredentials: true,
        }
      );
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error("Error creating product category", error);
      throw error; // Optionally, rethrow the error to handle it elsewhere
    }
  };

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/productCategory/`, {
        withCredentials: true,
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching product categories", error);
    }
  })

  const fetchCategoryById = async (categoryId) => {
    try {
      const response = await axios.get(`${baseUrl}/api/productCategory/${categoryId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching product category by ID", error);
    }
  };

  const updateCategory = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/productCategory/${id}`,
        updatedData, {
          withCredentials: true,
        }
      );
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error("Error updating product category", error);
      throw error; // Optionally, rethrow the error to handle it elsewhere
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/productCategory/${id}`, {
        withCredentials: true,
      });
      // No need to return anything if the deletion is successful
    } catch (error) {
      console.error("Error deleting product category", error);
      throw error; // Optionally, rethrow the error to handle it elsewhere
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const contextValue = {
    products,
    categories,
    createProduct,
    fetchProducts,
    updateProductById,
    deleteProductById,
    createCategory,
    fetchCategories,
    fetchCategoryById,
    updateCategory,
    deleteCategory
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
