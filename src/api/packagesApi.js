import {
  fetchPackages,
  insertPackage,
  modifyPackage,
  removePackage,
} from "../services/packageService";

export const getPackages = () => fetchPackages();

export const createPackage = (data) => insertPackage(data);

export const updatePackage = (id, data) => modifyPackage(id, data);

export const deletePackage = (id) => removePackage(id);
