export default function DoctorAvailabilityCalendar({
  selectedDate,
  onSelect,
  doctor,
}) {
  const today = new Date();
  const days = [];

  const workingDays = doctor?.workingDays || [1, 2, 3, 4, 5];

  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const day = date.getDay();
    const iso = date.toISOString().split("T")[0];

    const label = date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

    const disabled = !workingDays.includes(day);

    days.push({ iso, label, disabled });
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {days.map((d) => {
        const isSelected = selectedDate === d.iso;

        return (
          <button
            key={d.iso}
            type="button"
            disabled={d.disabled}
            onClick={() => onSelect(d.iso)}
            className={`
            py-3 rounded-lg text-sm border transition

            ${
              d.disabled
                ? "opacity-30 cursor-not-allowed"
                : isSelected
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-200 dark:border-white/10 hover:bg-blue-50 dark:hover:bg-white/10"
            }
            `}
          >
            {d.label}
          </button>
        );
      })}
    </div>
  );
}
