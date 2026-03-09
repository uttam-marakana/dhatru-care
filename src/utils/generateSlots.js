/*
Generate time slots between working hours
Example:
generateSlots(9, 17, 30)

Result:
09:00
09:30
10:00
10:30
...
*/

export function generateSlots(startHour = 9, endHour = 17, interval = 30) {
  const slots = [];

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const h = String(hour).padStart(2, "0");
      const m = String(minute).padStart(2, "0");

      slots.push(`${h}:${m}`);
    }
  }

  return slots;
}

/* ------------------------------------------------ */
/* FILTER BOOKED SLOTS */
/* ------------------------------------------------ */

export function filterAvailableSlots(allSlots = [], bookedSlots = []) {
  return allSlots.filter((slot) => !bookedSlots.includes(slot));
}

/* ------------------------------------------------ */
/* FORMAT DATE */
/* ------------------------------------------------ */

export function formatDate(date) {
  return date.toISOString().split("T")[0];
}
