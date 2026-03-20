import {
  createAppointmentEngine,
  cancelAppointmentEngine,
  rescheduleAppointmentEngine,
} from "./bookingEngine";

import {
  doc,
  serverTimestamp,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  runTransaction,
} from "firebase/firestore";
import { db } from "../firebase";

import { logAdminAction } from "./auditService";

import { canTransition, APPOINTMENT_STATUS } from "../utils/appointmentStatus";

const appointmentsRef = collection(db, "appointments");
const slotsRef = collection(db, "appointmentSlots");

/* 🔥 NORMALIZER (CRITICAL) */
const normalizeStatus = (status) =>
  String(status || "")
    .toLowerCase()
    .trim();

/* CREATE */
export const createAppointmentTransaction = (data) =>
  createAppointmentEngine(data);

/* 🔥 STATUS UPDATE */
export const updateAppointmentStatusService = async (
  id,
  nextStatus,
  meta = {},
) => {
  const appointmentRef = doc(db, "appointments", id);

  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(appointmentRef);

    if (!snap.exists()) throw new Error("Appointment not found");

    const appointment = snap.data();

    const currentStatus = normalizeStatus(appointment.status);
    const normalizedNext = normalizeStatus(nextStatus);

    /* 🔒 CONFLICT DETECTION */
    if (appointment.status !== currentStatus) {
      throw new Error("Conflict: Appointment updated by another admin");
    }

    /* 🔒 VALIDATE TRANSITION */
    if (!canTransition(currentStatus, normalizedNext)) {
      throw new Error(
        `Invalid transition: ${currentStatus} → ${normalizedNext}`,
      );
    }

    const slotId = appointment.slotId;

    /* 🔓 RELEASE SLOT */
    const shouldRelease =
      normalizedNext === APPOINTMENT_STATUS.CANCELLED ||
      normalizedNext === APPOINTMENT_STATUS.REJECTED;

    if (shouldRelease && slotId) {
      const slotRef = doc(db, "appointmentSlots", slotId);

      transaction.set(
        slotRef,
        {
          isBooked: false,
          isLocked: false,
          lockedBy: null,
          lockedUntil: null,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
    }

    /* 🧾 STATUS HISTORY */
    const historyEntry = {
      from: currentStatus,
      to: normalizedNext,
      at: serverTimestamp(),
      by: meta.userId || "admin",
    };

    transaction.update(appointmentRef, {
      status: normalizedNext,
      updatedAt: serverTimestamp(),
      statusHistory: [...(appointment.statusHistory || []), historyEntry],
    });

    /* 🛡 AUDIT LOG */
    await logAdminAction({
      type: "STATUS_CHANGE",
      appointmentId: id,
      from: currentStatus,
      to: normalizedNext,
      userId: meta.userId || "admin",
      tenantId: appointment.tenantId || "default",
    });
  });
};

/* CANCEL */
export const cancelAppointmentService = (id, slotId) =>
  cancelAppointmentEngine(id, slotId);

/* RESCHEDULE */
export const rescheduleAppointmentService = (appt, d, t) =>
  rescheduleAppointmentEngine(appt, d, t);

/* ADMIN */
export const subscribeAppointmentsService = (callback) => {
  const q = query(appointmentsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snap) => {
    callback(
      snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })),
    );
  });
};

/* USER */
export const subscribeUserAppointmentsService = (userId, callback) => {
  const q = query(
    appointmentsRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(q, (snap) => {
    callback(
      snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })),
    );
  });
};

/* 🔥 SLOT LISTENER (FINAL SAFE VERSION) */
export const subscribeDoctorSlotsService = (doctorId, date, callback) => {
  const q = query(
    slotsRef,
    where("doctorId", "==", doctorId),
    where("date", "==", date),
  );

  return onSnapshot(q, (snap) => {
    const now = Date.now();

    const slotState = snap.docs.map((d) => {
      const data = d.data();

      const expired =
        data.lockedUntil &&
        data.lockedUntil.toMillis &&
        data.lockedUntil.toMillis() < now;

      const isLocked = data.isLocked && !expired;
      const isBooked = !!data.isBooked || !!data.booked;

      return {
        time: data.time?.trim(),
        isBooked,
        isLocked,
      };
    });

    callback(slotState);
  });
};
