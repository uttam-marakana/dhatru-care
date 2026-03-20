import {
  createAppointmentTransaction,
  updateAppointmentStatusService,
  cancelAppointmentService,
  rescheduleAppointmentService,
  subscribeAppointmentsService,
  subscribeUserAppointmentsService,
  subscribeDoctorSlotsService,
} from "../services/appointmentService";

/* --- CREATE ----------- */

export const createAppointment = (data) => createAppointmentTransaction(data);

/* --- STATUS ----------- */

export const updateAppointmentStatus = (id, status, meta) =>
  updateAppointmentStatusService(id, status, meta);

/* --- CANCEL ----------- */

export const cancelAppointment = (id, slotId) =>
  cancelAppointmentService(id, slotId);

/* --- RESCHEDULE ----------- */

export const rescheduleAppointment = (appt, d, t) =>
  rescheduleAppointmentService(appt, d, t);

/* --- ADMIN ----------- */

export const subscribeAppointments = (tenantId, cb) =>
  subscribeAppointmentsService(tenantId, cb);

/* --- USER ----------- */

export const subscribeUserAppointments = (userId, cb) =>
  subscribeUserAppointmentsService(userId, cb);

/* --- 🔥 SLOT LISTENER ----------- */

export const subscribeDoctorSlots = (doctorId, date, callback) =>
  subscribeDoctorSlotsService(doctorId, date, callback);
