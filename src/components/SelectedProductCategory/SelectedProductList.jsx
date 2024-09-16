import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "../Provider/ProductProvider";
import { useNavigate, useParams } from "react-router-dom";
import BackNavigation from "../BackNavigation/BackNavigation";
import Footer from "../Footer/Footer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectedProductList = () => {
  const { products, categories } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryName } = useParams();
  const navigate = useNavigate();

  // State for filters
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [availableBrands, setAvailableBrands] = useState([]);

  // Fetch and filter products based on category and selected filters
  useEffect(() => {
    const filterProducts = () => {
      if (!products.length || !categories.length) {
        setLoading(true);
        return;
      }

      // Find category ID by category name
      const selectedCategory = categories.find(
        (category) => category.categoryName === categoryName
      );
      if (!selectedCategory) {
        setFilteredProducts([]);
        setLoading(false);
        return;
      }

      // Filter products based on the selected category ID
      let filteredProductsByCategory = products.filter(
        (product) => product.product_category === selectedCategory._id
      );

      // Get unique brands for the selected category
      const brandsForCategory = Array.from(
        new Set(filteredProductsByCategory.map((product) => product.brandName))
      );

      setAvailableBrands(brandsForCategory); // Update available brands state

      // Apply brand filter if selected and not "all"
      if (selectedBrand !== "all") {
        filteredProductsByCategory = filteredProductsByCategory.filter(
          (product) => product.brandName === selectedBrand
        );
      }

      // Apply price filter if selected and not "all"
      if (selectedPriceRange !== "all") {
        const [minPrice, maxPrice] = selectedPriceRange.split("-");
        filteredProductsByCategory = filteredProductsByCategory.filter(
          (product) =>
            product.sellingPrice.$numberDecimal >= parseInt(minPrice) &&
            product.sellingPrice.$numberDecimal <= parseInt(maxPrice)
        );
      }

      setFilteredProducts(filteredProductsByCategory);
      setLoading(false);
    };

    filterProducts();
  }, [products, categories, categoryName, selectedBrand, selectedPriceRange]);

  const handleProductClick = (productName) => {
    navigate(`/product-details/${productName}`);
  };
  const getCurrentUrl = `/product/${categoryName}`
  return (
    <div className="min-h-screen flex flex-col bg-violet-50">
      <BackNavigation currentURL={getCurrentUrl}/>

      {/* Main Content Wrapper */}
      <div className="flex-grow mt-[118px] md:mt-20 flex flex-col items-end mr-6">
        {/* Filters Section */}
        <div className="flex justify-center items-center space-x-4 mt-5">
          {/* Brand Filter */}
          <Select
            value={selectedBrand}
            onValueChange={(value) => setSelectedBrand(value)}
          >
            <SelectTrigger className="min-w-max lg:w-[180px]">
              <SelectValue placeholder="Select Brand">
                {selectedBrand === "all" ? "Select Brand" : selectedBrand}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">No Filter</SelectItem> {/* Use "all" instead of "" */}
                {availableBrands.map((brand, index) => (
                  <SelectItem key={index} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Price Range Filter */}
          <Select
            value={selectedPriceRange}
            onValueChange={(value) => setSelectedPriceRange(value)}
          >
            <SelectTrigger className="min-w-max lg:w-[180px]">
              <SelectValue placeholder="Select Price Range">
                {selectedPriceRange === "all"
                  ? "Select Price Range"
                  : selectedPriceRange}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">No Filter</SelectItem> {/* Use "all" instead of "" */}
                <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                <SelectItem value="1000-5000">₹1000 - ₹5000</SelectItem>
                <SelectItem value="5000-20000">₹5000 - ₹20000</SelectItem>
                <SelectItem value="20000-50000">₹20000 - ₹50000</SelectItem>
                <SelectItem value="50000-100000">₹50000 - ₹100000</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Products Display Section */}
        <div className="w-full flex flex-col items-center justify-center h-full">
          {loading ? (
            <div className="flex justify-center items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-14 w-[400px]" />
                <Skeleton className="h-4 w-[300px]" />
                <Skeleton className="h-4 w-[300px]" />
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-lg font-semibold text-gray-700">No products available</p>
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 p-5 rounded-lg">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white text-center shadow-md rounded-lg p-3 hover:shadow-lg transition-all duration-300"
                  onClick={() => handleProductClick(product.productName)}
                >
                  <img
                    src={product.mainImage}
                    alt={product.productName}
                    className="w-full h-40 object-cover rounded-md cursor-pointer"
                  />
                  <p className="mt-2 text-sm md:text-base font-semibold text-gray-800">
                    {product.productName}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default SelectedProductList;
