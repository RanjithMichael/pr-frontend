import axios from "axios";

const BASE_URL = "https://pr-backend-10.onrender.com/api/auth"; // Backend URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // TURNED OFF - backend does NOT use cookies
});

// Attach JWT token to every request
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

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
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
