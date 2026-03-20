import { useState } from "react";
import { updateDoctor } from "../../../api/doctorsApi";
import FormCard from "../common/FormCard";

import { notifySuccess, notifyError } from "../../../utils/toast";

export default function DoctorScheduleForm({ doctor }) {
  const [form, setForm] = useState({
    workingDays: doctor?.workingDays || [1, 2, 3, 4, 5],
    startHour: doctor?.startHour || 9,
    endHour: doctor?.endHour || 17,
    slotDuration: doctor?.slotDuration || 30,
    leaveDates: doctor?.leaveDates?.join(", ") || "",
  });

  const [loading, setLoading] = useState(false);

  const days = [
    { label: "Sun", value: 0 },
    { label: "Mon", value: 1 },
    { label: "Tue", value: 2 },
    { label: "Wed", value: 3 },
    { label: "Thu", value: 4 },
    { label: "Fri", value: 5 },
    { label: "Sat", value: 6 },
  ];

  const toggleDay = (day) => {
    setForm((prev) => {
      const exists = prev.workingDays.includes(day);

      return {
        ...prev,
        workingDays: exists
          ? prev.workingDays.filter((d) => d !== day)
          : [...prev.workingDays, day],
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleLeaveDates = (e) => {
    setForm((prev) => ({
      ...prev,
      leaveDates: e.target.value,
    }));
  };

  const saveSchedule = async () => {
    setLoading(true);

    try {
      const payload = {
        workingDays: form.workingDays,
        startHour: form.startHour,
        endHour: form.endHour,
        slotDuration: form.slotDuration,
        leaveDates: form.leaveDates
          ? form.leaveDates.split(",").map((d) => d.trim())
          : [],
      };

      await updateDoctor(doctor.id, payload);

      notifySuccess("Schedule updated successfully");
    } catch (err) {
      console.error(err);
      notifyError("Failed to update schedule");
    }

    setLoading(false);
  };

  const inputStyle = `
  w-full p-3 rounded-lg
  border border-gray-200 dark:border-white/10
  bg-white dark:bg-white/5
  text-gray-900 dark:text-white
  `;

  return (
    <FormCard title="Doctor Schedule">
      {/* --- WORKING DAYS ----------- */}

      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">Working Days</label>

        <div className="grid grid-cols-7 gap-2">
          {days.map((d) => {
            const active = form.workingDays.includes(d.value);

            return (
              <button
                key={d.value}
                type="button"
                onClick={() => toggleDay(d.value)}
                className={`
                py-2 rounded-lg border text-sm
                ${
                  active
                    ? "bg-primary text-white border-primary"
                    : "border-gray-200 dark:border-white/10"
                }
                `}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- START HOUR ----------- */}

      <div>
        <label className="text-sm block mb-1">Start Hour</label>

        <input
          type="number"
          name="startHour"
          value={form.startHour}
          onChange={handleChange}
          min="0"
          max="23"
          className={inputStyle}
        />
      </div>

      {/* --- END HOUR ----------- */}

      <div>
        <label className="text-sm block mb-1">End Hour</label>

        <input
          type="number"
          name="endHour"
          value={form.endHour}
          onChange={handleChange}
          min="0"
          max="23"
          className={inputStyle}
        />
      </div>

      {/* --- SLOT DURATION ----------- */}

      <div>
        <label className="text-sm block mb-1">Slot Duration (minutes)</label>

        <input
          type="number"
          name="slotDuration"
          value={form.slotDuration}
          onChange={handleChange}
          min="5"
          step="5"
          className={inputStyle}
        />
      </div>

      {/* --- LEAVE DATES ----------- */}

      <div>
        <label className="text-sm block mb-1">Leave Dates</label>

        <input
          type="text"
          value={form.leaveDates}
          onChange={handleLeaveDates}
          placeholder="2025-04-10, 2025-04-11"
          className={inputStyle}
        />
      </div>

      {/* --- SAVE BUTTON ----------- */}

      <div className="md:col-span-2">
        <button
          onClick={saveSchedule}
          disabled={loading}
          className="
          bg-primary hover:opacity-90
          text-white px-6 py-3 rounded-lg
          "
        >
          {loading ? "Saving..." : "Save Schedule"}
        </button>
      </div>
    </FormCard>
  );
}
