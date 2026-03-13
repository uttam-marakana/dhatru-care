import {
  createAppointmentTransaction,
  updateAppointmentStatusService,
  cancelAppointmentService,
  subscribeAppointmentsService,
  subscribeUserAppointmentsService,
  subscribeDoctorSlotsService,
  rescheduleAppointmentService,
} from "../services/appointmentService";

/* CREATE APPOINTMENT */

export const createAppointment = async (data) => {
  return createAppointmentTransaction(data);
};

/* ADMIN STATUS UPDATE */

export const updateAppointmentStatus = (id, status) =>
  updateAppointmentStatusService(id, status);

/* CANCEL */

export const cancelAppointment = (appointmentId, slotId) =>
  cancelAppointmentService(appointmentId, slotId);

/* RESCHEDULE */

export const rescheduleAppointment = (appointment, newDate, newTime) =>
  rescheduleAppointmentService(appointment, newDate, newTime);

/* ADMIN APPOINTMENTS */

export const subscribeAppointments = (callback) =>
  subscribeAppointmentsService(callback);

/* USER APPOINTMENTS */

export const subscribeUserAppointments = (userId, callback) =>
  subscribeUserAppointmentsService(userId, callback);

/* DOCTOR SLOT LISTENER */

export const subscribeDoctorSlots = (doctorId, date, callback) =>
  subscribeDoctorSlotsService(doctorId, date, callback);
