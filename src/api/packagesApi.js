import {
  fetchPackages,
  insertPackage,
  modifyPackage,
  removePackage,
} from "../services/packageService";

/* --- FETCH Packages ----------- */

export const getPackages = () => fetchPackages();

/* --- CREATE ----------- */

export const createPackage = (data) => insertPackage(data);

/* --- UPDATE ----------- */

export const updatePackage = (id, data) => modifyPackage(id, data);

/* --- DELETE ----------- */

export const deletePackage = (id) => removePackage(id);
