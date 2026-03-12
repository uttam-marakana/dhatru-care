export default function FormCard({ title, children, actions }) {
  return (
    <div className="max-w-5xl mx-auto my-8">
      <div
        className="
        glass
        hover-lift
        p-6 sm:p-8
        "
      >
        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold gradient-heading">
            {title}
          </h2>

          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>

        {/* CONTENT */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
      </div>
    </div>
  );
}
