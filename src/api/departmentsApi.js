import {
  fetchDepartments,
  insertDepartment,
  modifyDepartment,
  removeDepartment,
} from "../services/departmentService";

export const getAllDepartments = (filters) => fetchDepartments(filters);

export const createDepartment = (data) => insertDepartment(data);

export const updateDepartment = (id, data) => modifyDepartment(id, data);

export const deleteDepartment = (id) => removeDepartment(id);
