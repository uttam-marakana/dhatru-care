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

/* NORMALIZER */
const normalizeStatus = (status) =>
  String(status || "pending")
    .toLowerCase()
    .trim();

/* CREATE */
export const createAppointmentTransaction = (data) =>
  createAppointmentEngine(data);

/* STATUS UPDATE */
export const updateAppointmentStatusService = async (
  id,
  nextStatus,
  meta = {},
) => {
  const appointmentRef = doc(db, "appointments", id);

  let auditPayload = null;

  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(appointmentRef);

    if (!snap.exists()) throw new Error("Appointment not found");

    const appointment = snap.data();

    const currentStatus = normalizeStatus(appointment.status);
    let normalizedNext = normalizeStatus(nextStatus);

    if (normalizedNext === "requested") {
      normalizedNext = "pending";
    }

    if (!canTransition(currentStatus, normalizedNext)) {
      throw new Error(
        `Invalid transition: ${currentStatus} → ${normalizedNext}`,
      );
    }

    const slotId = appointment.slotId;

    const shouldRelease =
      normalizedNext === APPOINTMENT_STATUS.CANCELLED ||
      normalizedNext === APPOINTMENT_STATUS.REJECTED;

    if (shouldRelease && slotId) {
      const slotRef = doc(db, "appointmentSlots", slotId);

      transaction.set(
        slotRef,
        {
          tenantId: appointment.tenantId,
          isBooked: false,
          isLocked: false,
          lockedBy: null,
          lockedUntil: null,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
    }

    const historyEntry = {
      from: currentStatus,
      to: normalizedNext,
      at: new Date().toISOString(),
      by: meta.userId || "admin",
    };

    transaction.update(appointmentRef, {
      status: normalizedNext,
      updatedAt: serverTimestamp(),
      statusHistory: [...(appointment.statusHistory || []), historyEntry],
    });

    auditPayload = {
      type: "STATUS_CHANGE",
      appointmentId: id,
      from: currentStatus,
      to: normalizedNext,
      userId: meta.userId || "admin",
      tenantId: appointment.tenantId,
    };
  });

  if (auditPayload) {
    await logAdminAction(auditPayload);
  }
};

/* ✅ CANCEL */
export const cancelAppointmentService = async (id, slotId) => {
  return cancelAppointmentEngine(id, slotId);
};

/* ✅ RESCHEDULE */
export const rescheduleAppointmentService = async (appt, date, time) => {
  return rescheduleAppointmentEngine(appt, date, time);
};

/* 🔥 ADMIN (FIXED) */
export const subscribeAppointmentsService = (tenantId, callback) => {
  if (!tenantId || typeof callback !== "function") {
    console.warn("Invalid subscription params");
    return () => {};
  }

  const q = query(appointmentsRef, orderBy("createdAt", "desc"));

  return onSnapshot(
    q,
    (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // 🔥 FILTER HERE
      const filtered = data.filter(
        (a) => !a.tenantId || a.tenantId === tenantId,
      );

      callback(filtered);
    },
    (err) => {
      console.error("Appointments listener error:", err);
    },
  );
};

/* 🔥 USER (SAFE) */
export const subscribeUserAppointmentsService = (userId, callback) => {
  if (!userId || typeof callback !== "function") {
    console.warn("Invalid user subscription");
    return () => {};
  }

  const q = query(
    appointmentsRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(
    q,
    (snap) => {
      const unique = new Map();

      snap.docs.forEach((d) => {
        unique.set(d.id, { id: d.id, ...d.data() });
      });

      callback([...unique.values()]);
    },
    (err) => {
      console.error("User appointments error:", err);
    },
  );
};

/* SLOT LISTENER */
export const subscribeDoctorSlotsService = (doctorId, date, callback) => {
  if (!doctorId || !date || typeof callback !== "function") {
    return () => {};
  }

  const q = query(
    slotsRef,
    where("doctorId", "==", doctorId),
    where("date", "==", date),
  );

  return onSnapshot(q, (snap) => {
    const now = Date.now();

    const slotState = snap.docs.map((d) => {
      const data = d.data();

      const expired = data.lockedUntil?.toMillis?.() < now;

      return {
        time: data.time?.trim(),
        isBooked: !!data.isBooked || !!data.booked,
        isLocked: data.isLocked && !expired,
      };
    });

    callback(slotState);
  });
};
