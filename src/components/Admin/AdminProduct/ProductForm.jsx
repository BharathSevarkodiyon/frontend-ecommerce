import React from "react";

const ProductForm = ({ 
  editedProduct, 
  handleProductChange, 
  handleCategoryChange, 
  handleSave, 
  handleCancel, 
  categories, 
  isCreating 
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{isCreating ? "Create Product" : "Edit Product"}</h2>
      <div className="bg-white p-4 rounded shadow">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Product Name *</label>
            <input
              type="text"
              value={editedProduct.productName || ""}
              onChange={(e) =>
                handleProductChange("productName", e.target.value)
              }
              placeholder="Product Name"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Description</label>
            <input
              type="text"
              value={editedProduct.description || ""}
              onChange={(e) =>
                handleProductChange("description", e.target.value)
              }
              placeholder="Product Description"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Item Price</label>
            <input
              type="number"
              value={editedProduct.itemPrice?.$numberDecimal || ""}
              onChange={(e) =>
                handleProductChange("itemPrice", e.target.value)
              }
              placeholder="Item Price"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Selling Price *</label>
            <input
              type="number"
              value={editedProduct.sellingPrice?.$numberDecimal || ""}
              onChange={(e) =>
                handleProductChange("sellingPrice", e.target.value)
              }
              placeholder="Selling Price"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Stock Quantity *</label>
            <input
              type="number"
              value={editedProduct.stockQuantity || ""}
              onChange={(e) =>
                handleProductChange("stockQuantity", e.target.value)
              }
              placeholder="Stock Quantity"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Discount</label>
            <input
              type="number"
              value={editedProduct.discount || ""}
              onChange={(e) =>
                handleProductChange("discount", e.target.value)
              }
              placeholder="Discount"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Product Category *</label>
            <select
              value={editedProduct.product_category || ""}
              onChange={handleCategoryChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Brand Name</label>
            <input
              type="text"
              value={editedProduct.brandName || ""}
              onChange={(e) =>
                handleProductChange("brandName", e.target.value)
              }
              placeholder="Brand Name"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Main Image URL *</label>
            <input
              type="text"
              value={editedProduct.mainImage || ""}
              onChange={(e) =>
                handleProductChange("mainImage", e.target.value)
              }
              placeholder="Main Image URL"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Additional Image URLs (comma-separated)</label>
            <input
              type="text"
              value={(editedProduct.additionalImages || []).join(", ")}
              onChange={(e) =>
                handleProductChange("additionalImages", e.target.value)
              }
              placeholder="Additional Image URLs"
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isCreating ? "Create" : "Save"}
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
