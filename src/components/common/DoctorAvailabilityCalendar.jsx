export default function DoctorAvailabilityCalendar({
  selectedDate,
  onSelect,
  doctor,
  availability = {},
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

    const totalSlots = availability?.[iso]?.total || 0;
    const bookedSlots = availability?.[iso]?.booked || 0;

    const isFullyBooked =
      totalSlots > 0 && totalSlots === bookedSlots;

    const disabled =
      !workingDays.includes(day) || isFullyBooked;

    days.push({
      iso,
      label,
      disabled,
      isFullyBooked,
    });
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
                  ? "opacity-30 cursor-not-allowed border-gray-200"
                  : isSelected
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-200 hover:bg-blue-50"
              }
            `}
          >
            {d.label}

            {/* OPTIONAL UX */}
            {d.isFullyBooked && (
              <div className="text-[10px] text-red-500">
                Full
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}