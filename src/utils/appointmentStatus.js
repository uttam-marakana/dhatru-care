/* -------------------------------- */
/* APPOINTMENT STATUS (SOURCE OF TRUTH) */
/* -------------------------------- */

export const APPOINTMENT_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  REJECTED: "rejected",
};

/* -------------------------------- */
/* 🔒 FINAL STATES */
/* -------------------------------- */

export const FINAL_STATUSES = [
  APPOINTMENT_STATUS.COMPLETED,
  APPOINTMENT_STATUS.CANCELLED,
  APPOINTMENT_STATUS.REJECTED,
];

/* -------------------------------- */
/* 🔁 STATE MACHINE */
/* -------------------------------- */

export const STATUS_TRANSITIONS = {
  pending: ["confirmed", "cancelled", "rejected"],
  confirmed: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
  rejected: [],
};

/* -------------------------------- */
/* VALIDATION */
/* -------------------------------- */

export const canTransition = (current, next) => {
  if (!current || !next) return false;
  return (STATUS_TRANSITIONS[current] || []).includes(next);
};

/* -------------------------------- */
/* UI LABELS */
/* -------------------------------- */

export const appointmentStatusLabels = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
  rejected: "Rejected",
};

/* -------------------------------- */
/* UI STYLES */
/* -------------------------------- */

export const appointmentStatusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
  rejected: "bg-gray-100 text-gray-600",
};

/* -------------------------------- */
/* UI HELPERS */
/* -------------------------------- */

export const getStatusStyle = (status) =>
  appointmentStatusStyles[status] || "bg-gray-100 text-gray-700";

export const getStatusLabel = (status) =>
  appointmentStatusLabels[status] || status;

export const isFinalStatus = (status) => FINAL_STATUSES.includes(status);

/* -------------------------------- */
/* 🔥 UI OPTIONS (FIXED EXPORT) */
/* -------------------------------- */

export const appointmentStatusOptions = Object.values(APPOINTMENT_STATUS).map(
  (status) => ({
    value: status,
    label: appointmentStatusLabels[status] || status,
  }),
);
