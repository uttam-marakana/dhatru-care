export const APPOINTMENT_STATUS = {
  REQUESTED: "requested",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  NO_SHOW: "no_show",
};

/* STATUS LABELS */

export const appointmentStatusLabels = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
  rescheduled: "Rescheduled",
};

/* STATUS COLORS */

export const appointmentStatusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
  rescheduled: "bg-purple-100 text-purple-700",
};

/* ADMIN OPTIONS */

export const appointmentStatusOptions = [
  APPOINTMENT_STATUS.PENDING,
  APPOINTMENT_STATUS.CONFIRMED,
  APPOINTMENT_STATUS.COMPLETED,
  APPOINTMENT_STATUS.CANCELLED,
];

/* HELPERS */

export const getStatusStyle = (status) =>
  appointmentStatusStyles[status] || "bg-gray-100 text-gray-700";

export const getStatusLabel = (status) =>
  appointmentStatusLabels[status] || status;
