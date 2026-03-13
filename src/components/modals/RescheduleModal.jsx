import { useState } from "react";

export default function RescheduleModal({
  open,
  appointment,
  onClose,
  onConfirm,
}) {
  const [date, setDate] = useState(appointment?.date || "");
  const [time, setTime] = useState(appointment?.time || "");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async () => {
    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    try {
      setLoading(true);

      await onConfirm({
        date,
        time,
      });

      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      fixed inset-0
      bg-black/50
      flex items-center justify-center
      z-50
      px-4
      "
    >
      <div
        className="
        w-full max-w-md
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-white/10
        rounded-xl
        p-6
        shadow-lg
        "
      >
        <h3 className="text-lg font-semibold mb-4">Reschedule Appointment</h3>

        <div className="space-y-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="
            w-full p-3 rounded-lg
            border border-gray-300
            dark:border-white/10
            bg-white dark:bg-gray-800
            "
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="
            w-full p-3 rounded-lg
            border border-gray-300
            dark:border-white/10
            bg-white dark:bg-gray-800
            "
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="
            px-4 py-2 rounded-lg
            border border-gray-300
            hover:bg-gray-100
            "
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="
            px-4 py-2 rounded-lg
            bg-blue-500 hover:bg-blue-600
            text-white
            "
          >
            {loading ? "Updating..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
