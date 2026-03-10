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

export const filterAvailableSlots = (allSlots, bookedSlots = []) => {
  return allSlots.filter((slot) => !bookedSlots.includes(slot));
};

export const isDoctorWorkingDay = (doctor, date) => {
  if (!doctor?.workingDays) return true;

  const day = new Date(date).getDay();

  return doctor.workingDays.includes(day);
};
