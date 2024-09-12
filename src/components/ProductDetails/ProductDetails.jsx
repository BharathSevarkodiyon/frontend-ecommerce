import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../Provider/ProductProvider";
import BackNavigation from "../BackNavigation/BackNavigation";
import { Toaster } from "sonner";
import Footer from "../Footer/Footer";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

const ProductDetails = () => {
  const { productName } = useParams();
  const { products } = useProducts();
  const navigate = useNavigate();

  // State to handle image hover
  const [displayedImage, setDisplayedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay or data fetching
    const timer = setTimeout(() => setLoading(false), 1000); // Replace with actual data fetching
    return () => clearTimeout(timer); // Cleanup
  }, []);

  const product = products.find(
    (product) => product.productName === productName
  );

  const handleAddToCart = () => {
    navigate(`/cart?productId=${product._id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-purple-100">
      <BackNavigation />

      <div className="flex-grow max-w-screen-lg mx-auto p-5 mt-[120px] sm:mt-16">
        {loading ? (
          <div className="flex justify-center items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-20 w-[200px] md:w-[400px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <>
            {product ? (
              <div className="flex flex-col md:flex-row items-start space-y-5 md:space-y-0 md:space-x-10">
                {/* Product Image */}
                <img
                  src={displayedImage || product.mainImage}
                  alt={product.productName}
                  className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-lg"
                />

                {/* Product Details */}
                <div className="w-full md:w-1/2">
                  {/* Product Name */}
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {product.productName}
                  </h1>

                  {/* Display Item Price */}
                  {product.itemPrice && (
                    <div className="mb-2">
                      <p className="text-gray-800 font-medium">
                        Item Price:
                        <span className="text-gray-700 font-semibold ml-2">
                          ₹{product.itemPrice.$numberDecimal}
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Discount */}
                  {product.discount !== undefined && product.discount > 0 && (
                    <div className="mb-2">
                      <p className="text-gray-800 font-medium">
                        Discount:
                        <span className="text-gray-700 font-semibold ml-2">
                          {product.discount}%
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Display Selling Price */}
                  <div className="mb-2">
                    <p className="text-gray-800 font-medium">
                      Price:
                      <span className="text-gray-700 font-semibold ml-2">
                        ₹{product.sellingPrice.$numberDecimal}
                      </span>
                    </p>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <p className="text-gray-800 font-medium">
                      Description:
                      <span className="text-gray-700 font-normal ml-2">
                        {product.description}
                      </span>
                    </p>
                  </div>

                  {/* Product Details */}
                  <div className="border-t border-b py-4 mb-4">
                    <p className="text-gray-800 font-medium">
                      Brand Name:
                      <span className="text-gray-700 font-normal ml-2">
                        {product.brandName}
                      </span>
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="flex justify-end mb-4">
                    <Toaster richColors />
                    <button
                      className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                  </div>

                  {/* Additional Images */}
                  <div className="mt-4">
                    <div className="flex space-x-4 cursor-pointer">
                      {product.additionalImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Additional ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-md shadow-md"
                          onMouseEnter={() => setDisplayedImage(image)}
                          onMouseLeave={() => setDisplayedImage(null)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center">Product not found.</p>
            )}
          </>
        )}
      </div>

      <Footer className="mt-4" /> {/* Adjust margin if needed */}
    </div>
  );
};

export default ProductDetails;
