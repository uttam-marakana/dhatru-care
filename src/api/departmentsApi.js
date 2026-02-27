// src/api/departmentsApi.js
import axiosInstance from "./axiosInstance";

// Get all departments
export const getAllDepartments = async () => {
  try {
    const response = await axiosInstance.get("/departments");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch departments";
  }
};

// Get single department by slug
export const getDepartmentBySlug = async (slug) => {
  try {
    const response = await axiosInstance.get(`/departments/${slug}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Department not found";
  }
};
