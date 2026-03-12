import {
  createAppointmentTransaction,
  updateAppointmentStatusService,
  subscribeAppointmentsService,
  subscribeUserAppointmentsService,
} from "../services/appointmentService";

export const createAppointment = async (data) => {
  return createAppointmentTransaction(data);
};

export const updateAppointmentStatus = (id, status) =>
  updateAppointmentStatusService(id, status);

export const subscribeAppointments = (callback) =>
  subscribeAppointmentsService(callback);

export const subscribeUserAppointments = (userId, callback) =>
  subscribeUserAppointmentsService(userId, callback);
