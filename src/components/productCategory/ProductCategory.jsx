import React from 'react';
import { useProducts } from '../Provider/ProductProvider';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const ProductCategory = () => {
  const { categories } = useProducts();
  const navigate = useNavigate();
  const loading = categories.length === 0;

  const handleCategoryClick = (categoryName) => {
    navigate(`/product/${categoryName}`);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 mt-[115px] sm:mt-12 bg-yellow-50">
      {/* Increased padding and top margin */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 justify-center">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-md" />
              <Skeleton className="mt-2 h-3 w-16" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-6 md:gap-2 lg:gap-4 xl:gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer m-2"
                onClick={() => handleCategoryClick(category.categoryName)}
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 mb-2">
                  <img
                    src={category.image}
                    alt={category.categoryName}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-center truncate w-full">{category.categoryName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
