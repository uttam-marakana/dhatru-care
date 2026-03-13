import {
  fetchDoctors,
  fetchDoctorById,
  insertDoctor,
  modifyDoctor,
  removeDoctor,
} from "../services/doctorService";

/* ------ GENERAL DOCTOR FETCH ---------------------- */

export const getDoctors = (filters) => fetchDoctors(filters);

/* ------ FETCH DOCTORS BY DEPARTMENT ---------------------- */

export const getDoctorsByDepartment = (departmentId) =>
  fetchDoctors({ department: departmentId });

/* ------ FETCH SINGLE DOCTOR ---------------------- */

export const getDoctorById = (id) => fetchDoctorById(id);

/* ------ CREATE ---------------------- */

export const createDoctor = (data) => insertDoctor(data);

/* ------ UPDATE ---------------------- */

export const updateDoctor = (id, data) => modifyDoctor(id, data);

/* ------ DELETE ---------------------- */

export const deleteDoctor = (id) => removeDoctor(id);
