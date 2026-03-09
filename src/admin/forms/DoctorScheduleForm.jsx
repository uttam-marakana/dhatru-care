import { useState } from "react";
import { updateDoctor } from "../../api/doctorsApi";

export default function DoctorScheduleForm({ doctor }) {
  const [form, setForm] = useState({
    workingDays: doctor?.workingDays || [1, 2, 3, 4, 5],
    startHour: doctor?.startHour || 9,
    endHour: doctor?.endHour || 17,
    slotDuration: doctor?.slotDuration || 30,
  });

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

  const saveSchedule = async () => {
    try {
      await updateDoctor(doctor.id, form);
      alert("Doctor schedule updated");
    } catch (err) {
      alert(err.message);
    }
  };

  const inputStyle = `
  w-full p-3 rounded-lg
  border border-gray-200 dark:border-white/10
  bg-white dark:bg-white/5
  text-gray-900 dark:text-white
  `;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Doctor Schedule</h2>

      {/* WORKING DAYS */}

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
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-200 dark:border-white/10"
              }
              `}
            >
              {d.label}
            </button>
          );
        })}
      </div>

      {/* START TIME */}

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

      {/* END TIME */}

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

      {/* SLOT DURATION */}

      <div>
        <label className="text-sm block mb-1">Slot Duration (minutes)</label>

        <input
          type="number"
          name="slotDuration"
          value={form.slotDuration}
          onChange={handleChange}
          min="10"
          step="5"
          className={inputStyle}
        />
      </div>

      <button
        onClick={saveSchedule}
        className="
        bg-blue-500 hover:bg-blue-600
        text-white px-6 py-3 rounded-lg
        "
      >
        Save Schedule
      </button>
    </div>
  );
}
