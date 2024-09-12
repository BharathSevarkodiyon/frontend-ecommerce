import React, { useState, useEffect } from "react";
import { useProducts } from "@/components/Provider/ProductProvider";
import { toast } from "sonner";
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlinePlusCircle } from "react-icons/hi";

const AdminCategories = () => {
  const { categories, fetchCategories, createCategory, updateCategory, deleteCategory } = useProducts();
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle edit category
  const handleEdit = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.categoryName);
    setNewCategoryImage(category.image || ""); // Set default if image is not available
    setShowPopup(true);
  };

  // Handle save category
  const handleSave = async () => {
    setLoading(true);
    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id, {
          categoryName: newCategoryName,
          image: newCategoryImage
        });
        toast.success("Category updated successfully!");
      } else {
        await createCategory({
          categoryName: newCategoryName,
          image: newCategoryImage
        });
        toast.success("Category created successfully!");
      }
      setNewCategoryName("");
      setNewCategoryImage("");
      setShowPopup(false);
      fetchCategories(); // Re-fetch categories to reflect changes
    } catch (error) {
      console.error("Error saving category", error);
      toast.error("Failed to save category.");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete category
  const handleDelete = async (id) => {
    toast.custom(
      (t) => (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p className="mb-4">Are you sure you want to delete this category?</p>
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={async () => {
                try {
                  await deleteCategory(id);
                  toast.success("Category deleted successfully!");
                  fetchCategories(); // Re-fetch categories to reflect changes
                } catch (error) {
                  console.error("Error deleting category", error);
                  toast.error("Failed to delete category.");
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

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Manage Categories</h2>
        <button
          onClick={() => {
            setEditingCategory(null);
            setNewCategoryName("");
            setNewCategoryImage("");
            setShowPopup(true);
          }}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded"
        >
          <HiOutlinePlusCircle className="mr-2 w-5 h-5" />
          Add New Category
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-2xl font-bold mb-4">
              {editingCategory ? "Edit Category" : "Create Category"}
            </h3>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category Name"
              className="border p-2 rounded w-full mb-4"
            />
            <input
              type="text"
              value={newCategoryImage}
              onChange={(e) => setNewCategoryImage(e.target.value)}
              placeholder="Image URL"
              className="border p-2 rounded w-full mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {editingCategory ? "Save" : "Create"}
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Category Name</th>
              <th className="px-4 py-2 border-b">Image URL</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="border px-4 py-2">{category.categoryName}</td>
                <td className="border px-4 py-2">
                <div className="truncate max-w-[250px]">
                    {category.image}
                  </div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-around space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="bg-blue-500 text-white p-1 rounded"
                    >
                      <HiOutlinePencilAlt className="w-5 h-5"/>
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      <HiOutlineTrash className="w-5 h-5"/>
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

export default AdminCategories;
