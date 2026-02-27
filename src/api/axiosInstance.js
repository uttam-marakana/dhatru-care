// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api", // fallback for dev
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor – add auth token if user is logged in
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // or from your auth context/Redux
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor – handle common errors (401, 403, network, etc.)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      if (error.response.status === 401) {
        // Unauthorized → logout or refresh token logic
        console.warn("Unauthorized – token may be expired");
        // Optional: localStorage.removeItem('authToken'); window.location.href = '/login';
      }
      if (error.response.status === 403) {
        console.warn("Forbidden – insufficient permissions");
      }
    } else if (error.request) {
      // No response received (network error, timeout, etc.)
      console.error("Network error or timeout:", error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
