// src/api/doctorsApi.js
import axiosInstance from "./axiosInstance";

// Get all doctors (with optional filters)
export const getDoctors = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.specialty) params.append("specialty", filters.specialty);
    if (filters.search) params.append("search", filters.search);
    if (filters.experience) params.append("experience", filters.experience);

    const response = await axiosInstance.get("/doctors", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch doctors";
  }
};

// Get single doctor by ID
export const getDoctorById = async (id) => {
  try {
    const response = await axiosInstance.get(`/doctors/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Doctor not found";
  }
};
