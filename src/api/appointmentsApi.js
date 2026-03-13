import {
  createAppointmentTransaction,
  updateAppointmentStatusService,
  cancelAppointmentService,
  subscribeAppointmentsService,
  subscribeUserAppointmentsService,
  subscribeDoctorSlotsService,
  rescheduleAppointmentService,
} from "../services/appointmentService";

export const createAppointment = async (data) => {
  return createAppointmentTransaction(data);
};

export const updateAppointmentStatus = (id, status) =>
  updateAppointmentStatusService(id, status);

export const cancelAppointment = (appointmentId, slotId) =>
  cancelAppointmentService(appointmentId, slotId);

export const rescheduleAppointment = (appointment, newDate, newTime) =>
  rescheduleAppointmentService(appointment, newDate, newTime);

export const subscribeAppointments = (callback) =>
  subscribeAppointmentsService(callback);

export const subscribeUserAppointments = (userId, callback) =>
  subscribeUserAppointmentsService(userId, callback);

export const subscribeDoctorSlots = (doctorId, date, callback) =>
  subscribeDoctorSlotsService(doctorId, date, callback);
