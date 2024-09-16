import React, { useState, useEffect } from "react";
import { useProducts } from "@/components/Provider/ProductProvider";
import { toast, Toaster } from "sonner";
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlinePlusCircle } from "react-icons/hi";
import ProductForm from "./ProductForm";
import Modal from "./Modal"; // Import the Modal component
import { useAuth } from "@/components/Provider/AuthContext"; // Import useAuth

const AdminProduct = () => {
  const {
    products,
    categories,
    fetchProducts,
    updateProductById,
    deleteProductById,
    createProduct,
  } = useProducts();
  const { user } = useAuth(); // Get the user from AuthContext

  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Effect to check user role
  useEffect(() => {
    if (user && user.role !== 'admin') {
      toast.error("You are not authorized to perform this action.");
    }
  }, [user]);

  // Function to handle product field changes
  const handleProductChange = (field, value) => {
    setEditedProduct((prevProduct) => {
      if (field === "itemPrice") {
        return {
          ...prevProduct,
          itemPrice: { $numberDecimal: value },
        };
      }
      if (field === "sellingPrice") {
        return {
          ...prevProduct,
          sellingPrice: { $numberDecimal: value },
        };
      }
      if (field === "discount") {
        return {
          ...prevProduct,
          discount: value,
        };
      }
      if (field === "additionalImages") {
        return {
          ...prevProduct,
          additionalImages: value.split(",").map((url) => url.trim()).filter((url) => url),
        };
      }
      return {
        ...prevProduct,
        [field]: value,
      };
    });
  };

  // Function to handle clicking the Edit icon
  const handleEditClick = (product) => {
    setEditingProductId(product._id);
    setEditedProduct(product);
    setIsModalOpen(true); // Open the modal when editing
  };

  // Function to validate product fields
  const validateProduct = (product) => {
    if (!product.productName || !product.sellingPrice?.$numberDecimal || !product.mainImage || !product.product_category || !product.stockQuantity) {
      return false;
    }
    return true;
  };

  // Function to handle saving the edited product
  const handleSave = async () => {
    if (!validateProduct(editedProduct)) {
      toast.error("Please fill in all required fields: Product Name, Selling Price, Main Image URL, Product Category, and Stock Quantity.");
      return;
    }

    try {
      if (editingProductId) {
        await updateProductById(editingProductId, editedProduct);
        setEditingProductId(null);
        fetchProducts();
        toast.success("Product updated successfully!");
      } else {
        await createProduct(editedProduct);
        setCreatingProduct(false);
        fetchProducts();
        setEditedProduct({});
        toast.success("Product created successfully!");
      }
    } catch (error) {
      toast.error("Failed to save the product.");
    } finally {
      setIsModalOpen(false); // Close the modal after saving
    }
  };

  // Function to handle cancel action
  const handleCancel = () => {
    setCreatingProduct(false);
    setEditingProductId(null);
    setEditedProduct({});
    setIsModalOpen(false); // Close the modal when canceling
  };

  // Function to handle deleting a product
  const handleDelete = (productId) => {
    toast.custom(
      (t) => (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p className="mb-4">Are you sure you want to delete this product?</p>
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={async () => {
                try {
                  await deleteProductById(productId);
                  fetchProducts();
                  toast.success("Product deleted successfully!");
                } catch (error) {
                  toast.error("Failed to delete the product.");
                }
                toast.dismiss(t);
              }}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => toast.dismiss(t)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
      }
    );
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      product_category: selectedCategoryId,
    }));
  };

  if (!user || user.role !== 'admin') {
    // If not admin, do not render the component and show a toast
    toast.error("Not a Admin user.");
    return null;
  }

  return (
    <div className="p-8">
      <Toaster richColors position="top-center"  expand={false}/>
      <h1 className="text-3xl font-bold mb-8">Admin - Manage Products</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setCreatingProduct(true);
            setIsModalOpen(true); // Open the modal when creating a new product
          }}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded"
        >
          <HiOutlinePlusCircle className="mr-2" />
          Add New Product
        </button>
      </div>

      {/* Modal for Product Form */}
      <Modal isOpen={isModalOpen} onClose={handleCancel}>
        <ProductForm
          editedProduct={editedProduct}
          handleProductChange={handleProductChange}
          handleCategoryChange={handleCategoryChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          categories={categories}
          isCreating={creatingProduct}
        />
      </Modal>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Product Name</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="border px-4 py-2">{product.productName}</td>
                <td className="border px-4 py-2">
                  {categories.find((category) => category._id === product.product_category)?.categoryName}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-around space-x-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="bg-blue-500 text-white p-1 rounded"
                    >
                      <HiOutlinePencilAlt className=" w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      <HiOutlineTrash className=" w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProduct;
