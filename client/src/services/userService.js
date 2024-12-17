import axios from "axios";

/**
 * Fetches the user profile details using the stored token.
 * Redirects to login if token is missing or invalid.
 *
 * @param {Function} navigate - The navigation function to redirect users.
 * @returns {Object} - User profile data.
 * @throws {Error} - Throws an error if the profile can't be fetched.
 */

export const fetchUserProfile = async (navigate) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("You are not logged in.");
    }

    const response = await axios.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.user;
  } catch (error) {
    console.error("Error fetching profile details:", error);
    localStorage.removeItem("token");
    navigate("/login");
    throw new Error("Unable to fetch profile details. Please log in again.");
  }
};
