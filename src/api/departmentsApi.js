import {
  fetchDepartments,
  fetchDepartmentBySlug,
  insertDepartment,
  modifyDepartment,
  removeDepartment,
} from "../services/departmentService";

/* --- FETCH Departments ----------- */

export const getAllDepartments = (filters) => fetchDepartments(filters);

/* --- FETCH BY SLUG----------- */

export const getDepartmentBySlug = (slug) => fetchDepartmentBySlug(slug);

/* --- CREATE ----------- */

export const createDepartment = (data) => insertDepartment(data);

/* --- UPDATE ----------- */

export const updateDepartment = (id, data) => modifyDepartment(id, data);

/* --- DELETE ----------- */

export const deleteDepartment = (id) => removeDepartment(id);
