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
      flex items-center
      justify-between
      gap-4
      "
    >
      {/* TEXT */}

      <div>
        <p className="text-sm text-[var(--text-secondary)]">{title}</p>

        <p className="text-2xl font-bold text-[var(--text)] mt-1">{value}</p>
      </div>

      {/* ICON */}

      {icon && (
        <div className="text-2xl" style={{ color }}>
          {icon}
        </div>
      )}
    </div>
  );
}
