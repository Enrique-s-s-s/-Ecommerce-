/**
 * Registers a new user with the given details.
 *
 * @param {Object} formData - User registration details (name, email, password).
 * @returns {Object} - The API response data.
 * @throws {Error} - Throws an error if the registration fails.
 */
export const registerUser = async (formData) => {
  const { name, email, password } = formData;

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong during registration.");
    }

    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error(error.message || "An error occurred during registration.");
  }
};

/**
 * Logs in a user with the provided email and password.
 *
 * @param {Object} credentials - User login credentials (email, password).
 * @returns {Object} - The API response data containing the token.
 * @throws {Error} - Throws an error if login fails.
 */
export const loginUser = async (credentials) => {
  const { email, password } = credentials;

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Invalid credentials");
    }

    return data; 
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error(error.message || "An error occurred during login.");
  }
};

