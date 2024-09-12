import React, { useEffect, useState } from "react";
import { useOrders } from "@/components/Provider/OrderProvider"; // Import order provider
import { useAuth } from "@/components/Provider/AuthContext"; // Import auth provider
import { useProducts } from "@/components/Provider/ProductProvider"; // Import product provider
import { toast } from "sonner"; // Import toast for notifications

const ViewOrders = () => {
  const { fetchOrders, updateOrderStatus } = useOrders(); // Get the fetchOrders and updateOrderStatus functions from the order provider
  const { allUser } = useAuth(); // Get the user details from the auth provider
  const { products } = useProducts(); // Get the list of all products from the product provider
  const [orders, setOrders] = useState([]); // State to hold the fetched orders
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold the selected order for editing
  const [newStatus, setNewStatus] = useState(""); // State to hold the new status

  // Fetch orders when the component mounts
  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        const fetchedOrders = await fetchOrders(); // Fetch orders from the backend
        setOrders(fetchedOrders); // Set the fetched orders to state
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders."); // Show error toast
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [fetchOrders]);

  // Function to get user's name by their ID
  const getUserNameById = (userId) => {
    const user = allUser.find((user) => user._id === userId);
    if (user) {
      return `${user.firstName} ${user.lastName}`; // Return full name if user is found
    }
    return "Unknown User"; // Default if no match found
  };

  // Function to get product name by product ID
  const getProductNameById = (productId) => {
    const product = products.find((product) => product._id === productId);
    if (product) {
      return product.productName; // Return product name if found
    }
    return "Unknown Product"; // Default if no match found
  };

  // Handle opening the modal
  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status); // Set the current status to edit
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Handle saving the new status
  const handleSaveStatus = async () => {
    if (selectedOrder && newStatus) {
      try {
        await updateOrderStatus(selectedOrder._id, newStatus); // Call the API to update the order status
        toast.success("Order status updated successfully!");
        // Update the order list with new status
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === selectedOrder._id ? { ...order, status: newStatus } : order
          )
        );
        handleCloseModal(); // Close the modal after saving
      } catch (error) {
        toast.error("Failed to update order status.");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {loading ? (
        <p>Loading orders...</p> // Show a loading indicator while fetching orders
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded shadow">
              <p>
                <strong>Customer:</strong> {getUserNameById(order.created_by)}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <div className="mt-2">
                <strong>Products:</strong>
                <ul className="list-disc list-inside">
                  {order.productDetails.map((product, index) => (
                    <li key={index}>
                      {getProductNameById(product.product_id)} - Quantity:{" "}
                      {product.orderedQuantity} - Price: Rs.
                      {product.sellingPrice}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Update Status button */}
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => handleOpenModal(order)}
              >
                Update Status
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for editing order status */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Update Order Status</h3>
            <p>
              <strong>Customer:</strong> {getUserNameById(selectedOrder.created_by)}
            </p>
            {/* Dropdown for editing status */}
            <p>
              <strong>Status:</strong>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="border p-2 rounded w-full mt-2"
              >
                {/* Dropdown options for order status */}
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSaveStatus}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
