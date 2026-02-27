// src/api/homeApi.js
import axiosInstance from "./axiosInstance";

// Get homepage featured data (departments, doctors, packages, stats)
export const getHomePageData = async () => {
  try {
    const response = await axiosInstance.get("/home/featured");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to load homepage data";
  }
};

// Get quick stats (patients treated, doctors, satisfaction, etc.)
export const getHomeStats = async () => {
  try {
    const response = await axiosInstance.get("/home/stats");
    return response.data;
  } catch (error) {
    console.error("Stats fetch failed:", error);
    return {
      patients: "50,000+",
      doctors: "200+",
      rating: "4.9",
      emergencies: "24×7",
    }; // fallback static data
  }
};
