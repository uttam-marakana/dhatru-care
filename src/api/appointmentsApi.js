// src/api/appointmentsApi.js
import axiosInstance from "./axiosInstance";

// Create new appointment
export const createAppointment = async (appointmentData) => {
  try {
    const response = await axiosInstance.post("/appointments", appointmentData);
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error.response?.data?.message || "Failed to book appointment";
  }
};

// Get user's appointments (authenticated)
export const getMyAppointments = async () => {
  try {
    const response = await axiosInstance.get("/appointments/me");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch appointments";
  }
};

// Cancel appointment
export const cancelAppointment = async (appointmentId) => {
  try {
    const response = await axiosInstance.delete(
      `/appointments/${appointmentId}`,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to cancel appointment";
  }
};
