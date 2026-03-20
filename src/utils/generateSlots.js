/* --- GENERATE ALL POSSIBLE SLOTS ----------- */

export const generateSlots = (startHour = 9, endHour = 17, interval = 30) => {
  const slots = [];

  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += interval) {
      const hour = h.toString().padStart(2, "0");
      const minute = m.toString().padStart(2, "0");

      slots.push(`${hour}:${minute}`);
    }
  }

  return slots;
};

/* --- REMOVE BOOKED / LOCKED ----------- */

export const filterAvailableSlots = (allSlots, unavailableSlots = []) => {
  return allSlots.filter((slot) => !unavailableSlots.includes(slot));
};

/* --- REMOVE PAST SLOTS ----------- */

export const filterPastSlots = (slots, date) => {
  const now = new Date();
  const selectedDate = new Date(date);

  return slots.filter((time) => {
    const slotDateTime = new Date(`${date}T${time}`);

    if (selectedDate.toDateString() === now.toDateString()) {
      return slotDateTime > now;
    }

    return true;
  });
};

/* --- DOCTOR WORKING DAY ----------- */

export const isDoctorWorkingDay = (doctor, date) => {
  if (!doctor?.workingDays) return true;

  const day = new Date(date).getDay();
  return doctor.workingDays.includes(day);
};

/* --- OPTIONAL: LEAVE ----------- */

export const isLeaveDate = (doctor, date) => {
  if (!doctor?.leaveDates) return false;

  const dateString = new Date(date).toISOString().split("T")[0];
  return doctor.leaveDates.includes(dateString);
};
