import { FaInbox } from "react-icons/fa";

export default function EmptyState({
  title = "No data available",
  description = "Nothing to display here yet.",
  action,
}) {
  return (
    <div
      className="
      glass
      text-center
      p-10
      flex flex-col
      items-center
      justify-center
      gap-4
      "
    >
      {/* ICON */}

      <div className="text-4xl text-[var(--muted)]">
        <FaInbox />
      </div>

      {/* TEXT */}

      <div>
        <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>

        <p className="text-sm text-[var(--text-secondary)] mt-1">
          {description}
        </p>
      </div>

      {/* ACTION */}

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
