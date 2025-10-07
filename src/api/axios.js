import axios from "axios";

const BASE_URL = "https://pr-backend-2.onrender.com/api/auth"; // Backend URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // needed for CORS if backend uses credentials
});

// Attach JWT token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")?.trim();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Token expired or invalid
        localStorage.removeItem("token");
        alert("Session expired. Please login again.");
        window.location.href = "/login";
      } else if (status === 403) {
        alert("You do not have permission to perform this action.");
      }
    }
    return Promise.reject(error);
  }
);

export default api;


