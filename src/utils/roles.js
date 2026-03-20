export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  STAFF: "staff",
  DOCTOR: "doctor",
  USER: "user",
};

export const ROLE_HIERARCHY = {
  super_admin: 5,
  admin: 4,
  staff: 3,
  doctor: 2,
  user: 1,
};

export const canAccess = (userRole, requiredRole) => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};
