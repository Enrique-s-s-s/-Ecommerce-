import axios from 'axios';

/**
 * Fetches a list of all products from the API.
 *
 * @returns {Array} - An array of products retrieved from the API.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const fetchProducts = async () => {
  try {
    const response = await axios.get('/api/products');
    return response.data.products; // Returns the array of products
  } catch (error) {
    console.error('There was an error fetching the products:', error);
    throw new Error('Unable to fetch products. Please try again later.');
  }
};

/**
 * Fetches details of a specific product by its ID.
 *
 * @param {string} id - The ID of the product to retrieve details for.
 * @returns {Object} - The product details object from the API.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const fetchProductDetails = async (id) => {
  try {
    const response = await axios.get(`/api/products/${id}`);
    return response.data; // Returns the product details
  } catch (error) {
    console.error('Error fetching the product details:', error);
    throw new Error('Unable to fetch product details. Please try again later.');
  }
};
