import {
  fetchDepartments,
  fetchDepartmentBySlug,
  insertDepartment,
  modifyDepartment,
  removeDepartment,
} from "../services/departmentService";

export const getAllDepartments = (filters) => fetchDepartments(filters);

export const getDepartmentBySlug = (slug) => fetchDepartmentBySlug(slug);

export const createDepartment = (data) => insertDepartment(data);

export const updateDepartment = (id, data) => modifyDepartment(id, data);

export const deleteDepartment = (id) => removeDepartment(id);
