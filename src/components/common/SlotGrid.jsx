export default function SlotGrid({ slots, selected, onSelect }) {
  if (!slots.length)
    return (
      <p className="text-gray-500 dark:text-gray-400">
        No slots available for selected date.
      </p>
    );

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {slots.map((slot) => {
        const isSelected = selected === slot;

        return (
          <button
            key={slot}
            type="button"
            onClick={() => onSelect(slot)}
            className={`
            py-2 rounded-lg text-sm font-medium
            border transition
            ${
              isSelected
                ? "bg-blue-500 text-white border-blue-500"
                : "border-gray-200 dark:border-white/10 hover:bg-blue-50 dark:hover:bg-white/10"
            }
            `}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
