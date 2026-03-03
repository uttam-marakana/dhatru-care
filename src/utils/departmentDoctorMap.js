/* ------------ DEPARTMENT → DOCTOR SPECIALTY MAP ---------------------------------------------- */

export const departmentDoctorMap = {
  cardiology: ["Cardiology", "cardiology"],

  neurology: ["Neurology", "neurology"],

  orthopedics: ["Orthopedics", "Orthopedic", "orthopedics"],

  pediatrics: ["Pediatrics", "pediatrics"],

  generalMedicine: ["General Medicine", "general", "general medicine"],

  dermatology: ["Dermatology", "dermatology"],

  ent: ["ENT", "Otorhinolaryngology", "ent"],
};

/* ------------ GET SPECIALTIES FROM DEPARTMENT ---------------------------------------------- */
export const getDoctorSpecialtiesFromDepartment = (slug) => {
  return departmentDoctorMap[slug] || [];
};
