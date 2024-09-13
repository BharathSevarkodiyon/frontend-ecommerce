import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "../Provider/ProductProvider";
import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi"; // Importing the icon

const ProductList = ({ category }) => {
  const { products, categories } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const filterProductsByCategory = () => {
      if (!products.length || !categories.length) {
        setLoading(true);
        return;
      }

      // Map the product category id with the product category name
      const categoryMap = categories.reduce((map, cat) => {
        map[cat._id] = cat.categoryName;
        return map;
      }, {});

      // Create a new key to store the product category name
      const productsWithCategoryNames = products.map((product) => ({
        ...product,
        product_category_name: categoryMap[product.product_category],
      }));

      // Filtering only the product based on product category
      const filteredProductsByCategory = productsWithCategoryNames.filter(
        (product) => product.product_category_name === category
      );

      setFilteredProducts(filteredProductsByCategory); // Set all products initially
      setLoading(false);
    };

    filterProductsByCategory();
  }, [products, categories, category]);

  const handleProductClick = (productName) => {
    navigate(`/product-details/${productName}`);
  };

  const handleViewMoreClick = () => {
    navigate(`/product/${category}`); // Navigating to the respective category page
  };

  // Adjust the number of products displayed based on screen size
  const displayedProductsSmall = filteredProducts.slice(0, 4); // Show 4 products on small screens
  const displayedProductsMedium = filteredProducts.slice(0, 6); // Show 6 products on medium screens
  const displayedProductsLarge = filteredProducts.slice(0, 5); // Show 5 products on large screens

  return (
    <div className="p-5 bg-purple-100 font-roboto"> {/* Add font-roboto class */}
      {/* Category Name and View More Button */}
      <div className="flex justify-between items-center mb-8 bg-violet-200 py-3 px-4 rounded-md">
        {/* Category Name */}
        <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
        {/* View More Button */}
        <button
          onClick={handleViewMoreClick}
          className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-lg"
        >
          View More
          <HiArrowRight className="ml-2 text-lg" />
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        // Product Image Grid
        <>
          {/* Small screens: 2 products per row */}
          <div className="grid grid-cols-2 gap-6 mb-6 sm:hidden font-roboto">
            {displayedProductsSmall.map((product, index) => (
              <div
                key={index}
                className="bg-white text-center shadow-md rounded-lg p-4 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => handleProductClick(product.productName)}
              >
                <img
                  src={product.mainImage}
                  alt={product.productName}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <p className="text-sm font-medium text-gray-800 bg-gray-50 py-2 px-1 rounded-md">
                  {product.productName}
                </p>
              </div>
            ))}
          </div>

          {/* Medium screens: 3 products per row */}
          <div className="hidden md:grid grid-cols-3 gap-6 mb-6 sm:hidden lg:hidden font-roboto">
            {displayedProductsMedium.map((product, index) => (
              <div
                key={index}
                className="bg-white text-center shadow-md rounded-lg p-4 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => handleProductClick(product.productName)}
              >
                <img
                  src={product.mainImage}
                  alt={product.productName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-md font-medium text-gray-800 bg-gray-50 py-2 px-1 rounded-md">
                  {product.productName}
                </p>
              </div>
            ))}
          </div>

          {/* Large screens: 5 products in a single row */}
          <div className="hidden lg:grid grid-cols-5 gap-6 mb-6 md:hidden font-roboto">
            {displayedProductsLarge.map((product, index) => (
              <div
                key={index}
                className="bg-white text-center shadow-md rounded-lg p-4 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => handleProductClick(product.productName)}
              >
                <img
                  src={product.mainImage}
                  alt={product.productName}
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
                <p className="text-md font-medium text-gray-800 bg-gray-50 py-2 px-1 rounded-md">
                  {product.productName}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
