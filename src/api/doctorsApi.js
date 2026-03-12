import {
  fetchDoctors,
  fetchDoctorById,
  insertDoctor,
  modifyDoctor,
  removeDoctor,
} from "../services/doctorService";

export const getDoctors = (filters) => fetchDoctors(filters);

export const getDoctorById = (id) => fetchDoctorById(id);

export const createDoctor = (data) => insertDoctor(data);

export const updateDoctor = (id, data) => modifyDoctor(id, data);

export const deleteDoctor = (id) => removeDoctor(id);
