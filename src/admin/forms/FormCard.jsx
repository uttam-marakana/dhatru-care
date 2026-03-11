export default function FormCard({ title, children, actions }) {
  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
        {/* HEADER */}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>

          {actions && <div>{actions}</div>}
        </div>

        {/* CONTENT */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
      </div>
    </div>
  );
}
