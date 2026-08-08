import { useState, useEffect } from "react";
import { notifyError } from "../../utils/toast";

export default function RescheduleModal({
  open,
  appointment,
  onClose,
  onConfirm,
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (appointment) {
      setDate(appointment.date || "");
      setTime(appointment.time || "");
    }
  }, [appointment]);

  if (!open) return null;

  const submit = async () => {
    if (!date || !time) {
      notifyError("Please select date and time");
      return;
    }

    try {
      setLoading(true);

      await onConfirm({ date, time });

      onClose();
    } catch (err) {
      notifyError(err.message);
    }

    setLoading(false);
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
          bg-[var(--card)]
          border border-[var(--border)]
          rounded-xl
          p-6
          shadow-lg
        "
      >
        <h3 className="text-lg font-semibold mb-4 text-[var(--text)]">
          Reschedule Appointment
        </h3>

        <div className="space-y-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="
              w-full p-3 rounded-lg
              border border-[var(--border)]
              bg-[var(--surface)]
              text-[var(--text)]
            "
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="
              w-full p-3 rounded-lg
              border border-[var(--border)]
              bg-[var(--surface)]
              text-[var(--text)]
            "
          />
        </div>

        <div className="flex flex-wrap justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-lg
              border border-[var(--border)]
              text-[var(--text-secondary)]
              hover:bg-[var(--card)]
            "
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="
              px-4 py-2 rounded-lg
              bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]
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
