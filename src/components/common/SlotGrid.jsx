export default function SlotGrid({
  slots = [],
  slotState = [],
  selected,
  onSelect,
}) {
  if (!slots.length) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        No slots available for this date.
      </p>
    );
  }

  const getStatus = (time) => {
    const slot = slotState?.find((s) => s.time === time);

    if (!slot) return "available";
    if (slot.isBooked || slot.booked) return "booked";
    if (slot.isLocked) return "locked";

    return "available";
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {slots.map((slot) => {
        const status = getStatus(slot);
        const isSelected = selected === slot;

        const isDisabled = status === "booked" || status === "locked";

        return (
          <button
            key={slot}
            type="button"
            disabled={isDisabled}
            onClick={() => !isDisabled && onSelect(slot)}
            className={`
              py-2 rounded-lg text-sm border transition relative

              ${isSelected ? "bg-blue-500 text-white border-blue-500" : ""}

              ${
                status === "available" && !isSelected
                  ? "border-gray-200 dark:border-white/10 hover:bg-blue-50 dark:hover:bg-white/10"
                  : ""
              }

              ${
                status === "booked"
                  ? "bg-red-100 text-red-500 border-red-200 opacity-70 cursor-not-allowed"
                  : ""
              }

              ${
                status === "locked"
                  ? "bg-yellow-100 text-yellow-600 border-yellow-200 opacity-70 cursor-not-allowed"
                  : ""
              }
            `}
          >
            {slot}

            {/* --- STATUS DOT ----------- */}
            <span
              className={`
                absolute top-1 right-1 w-2 h-2 rounded-full
                ${
                  status === "available"
                    ? "bg-green-500"
                    : status === "booked"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                }
              `}
            />
          </button>
        );
      })}
    </div>
  );
}
