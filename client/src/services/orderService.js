import axios from 'axios';

/**
 * Place an order by sending the customer's order and cart to the server.
 * It also checks if all customer details are provided and if there are items in the cart.
 *
 * @param {Object} customerDetails - The details of the customer making the order.
 * @param {Array} cart - The list of products in the user's cart.
 * @param {Function} setOrderPlaced - A function to set the order status after successful placement.
 * @returns {Promise<void>} - Returns a promise that resolves when the order is successfully placed.
 * @throws {Error} - Throws an error if there are validation issues or if the API request fails.
 */

export const placeOrder = async (customerDetails, cart, setOrderPlaced) => {
  if (!customerDetails.name || !customerDetails.address || !customerDetails.email) {
    throw new Error('Please fill in all the details!');
  }

  if (!Array.isArray(cart) || cart.length < 1) {
    throw new Error('You need to add products first');
  }

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("You must be logged in to place an order.");
  }

  try {
    const response = await axios.post(
      '/api/user/payment', 
      { cart },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.status === 200) {
      setOrderPlaced(true);
      return true;
    } else {
      throw new Error("Failed to place order. Please try again.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred while placing the order.");
  }
};
