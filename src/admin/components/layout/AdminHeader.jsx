export default function AdminHeader({ title, description, action }) {
  return (
    <div
      className="
      glass
      flex flex-col md:flex-row
      md:items-center md:justify-between
      gap-4
      px-5 sm:px-6
      py-5
      mb-6
      "
    >
      {/* TITLE AREA */}

      <div>
        <h2 className="text-xl sm:text-2xl font-bold gradient-heading">
          {title}
        </h2>

        {description && (
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {description}
          </p>
        )}
      </div>

      {/* ACTION AREA */}

      {action && (
        <div className="flex items-center gap-3 flex-wrap">{action}</div>
      )}
    </div>
  );
}
