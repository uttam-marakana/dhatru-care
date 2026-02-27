// src/api/packagesApi.js
import axiosInstance from "./axiosInstance";

// Get all health packages
export const getAllPackages = async () => {
  try {
    const response = await axiosInstance.get("/packages");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch packages";
  }
};

// Get single package by ID or slug
export const getPackageById = async (id) => {
  try {
    const response = await axiosInstance.get(`/packages/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Package not found";
  }
};
