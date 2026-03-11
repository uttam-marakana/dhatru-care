import { Link } from "react-router-dom";

export default function UniversalSearchDropdown({
  results,
  query,
  loading,
  activeIndex = -1,
}) {
  if (!query) return null;

  const { doctors, departments, packages, blogs } = results;

  const hasResults =
    doctors.length || departments.length || packages.length || blogs.length;

  return (
    <div
      className="
      mt-2
      bg-[var(--card)]
      border border-[var(--border)]
      rounded-xl
      shadow-xl
      overflow-hidden
      max-h-[420px]
      overflow-y-auto
      "
    >
      {/* Loading */}

      {loading && (
        <div className="p-4 text-sm text-[var(--text-secondary)]">
          Searching...
        </div>
      )}

      {!loading && !hasResults && (
        <div className="p-4 text-sm text-[var(--text-secondary)]">
          No results found
        </div>
      )}

      {/* Doctors */}

      {doctors.length > 0 && (
        <div className="border-b border-[var(--border)]">
          <div className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] uppercase">
            Doctors
          </div>

          {doctors.map((doc, index) => (
            <Link
              key={doc.id}
              to={`/doctors/${doc.id}`}
              className={`block px-4 py-3 text-sm hover:bg-[var(--surface)] ${
                activeIndex === index ? "bg-[var(--surface)]" : ""
              }`}
            >
              <div className="font-medium">{doc.name}</div>
              <div className="text-xs text-[var(--color-primary)]">
                {doc.specialty}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Departments */}

      {departments.length > 0 && (
        <div className="border-b border-[var(--border)]">
          <div className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] uppercase">
            Departments
          </div>

          {departments.map((dep) => (
            <Link
              key={dep.id}
              to={`/departments/${dep.id}`}
              className="block px-4 py-3 text-sm hover:bg-[var(--surface)]"
            >
              {dep.name}
            </Link>
          ))}
        </div>
      )}

      {/* Packages */}

      {packages.length > 0 && (
        <div className="border-b border-[var(--border)]">
          <div className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] uppercase">
            Packages
          </div>

          {packages.map((pkg) => (
            <Link
              key={pkg.id}
              to="/packages"
              className="block px-4 py-3 text-sm hover:bg-[var(--surface)]"
            >
              {pkg.name}
            </Link>
          ))}
        </div>
      )}

      {/* Blogs */}

      {blogs.length > 0 && (
        <div>
          <div className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] uppercase">
            Blogs
          </div>

          {blogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="block px-4 py-3 text-sm hover:bg-[var(--surface)]"
            >
              {blog.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
