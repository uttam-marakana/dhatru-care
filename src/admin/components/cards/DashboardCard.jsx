export default function DashboardCard({
  title,
  value,
  icon,
  color = "var(--color-primary)",
}) {
  return (
    <div
      className="
      glass
      hover-lift
      p-5
      flex
      items-center
      justify-between
      gap-4
      min-h-[90px]
      transition
      "
    >
      {/* TEXT */}

      <div className="flex flex-col">
        <p className="text-sm text-[var(--text-secondary)]">{title}</p>

        <p className="text-2xl font-bold text-[var(--text)] mt-1">{value}</p>
      </div>

      {/* ICON */}

      {icon && (
        <div
          className="
          flex
          items-center
          justify-center
          w-11
          h-11
          rounded-lg
          text-lg
          "
          style={{
            backgroundColor: `${color}20`,
            color: color,
          }}
        >
          {icon}
        </div>
      )}
    </div>
  );
}
