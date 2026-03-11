import { Link } from "react-router-dom";

function highlightText(text, query) {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="text-[var(--color-primary)] font-semibold">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export default function SearchDropdown({
  results,
  query,
  loading,
  activeIndex,
}) {
  if (!query) return null;

  return (
    <div
      className="
      absolute top-full left-0 mt-2
      w-full
      bg-[var(--card)]
      border border-[var(--border)]
      rounded-xl
      shadow-xl
      overflow-hidden
      z-50
      "
    >
      {loading && (
        <p className="p-4 text-sm text-[var(--text-secondary)]">Searching...</p>
      )}

      {!loading && results.doctors.length === 0 && (
        <p className="p-4 text-sm text-[var(--text-secondary)]">
          No results found
        </p>
      )}

      {!loading &&
        results.doctors.map((doc, index) => (
          <Link
            key={doc.id}
            to={`/doctors/${doc.id}`}
            className={`
              block px-4 py-3 transition
              ${
                activeIndex === index
                  ? "bg-[var(--color-primary)]/10"
                  : "hover:bg-[var(--surface)]"
              }
            `}
          >
            <p className="font-medium text-[var(--text)]">
              {highlightText(doc.name, query)}
            </p>

            <p className="text-sm text-[var(--text-secondary)]">
              {highlightText(doc.specialty, query)}
            </p>
          </Link>
        ))}

      {results.doctors.length > 0 && (
        <Link
          to={`/search?q=${encodeURIComponent(query)}`}
          className="
            block text-center
            py-3
            text-sm
            font-medium
            border-t
            text-[var(--color-primary)]
          "
        >
          View all results
        </Link>
      )}
    </div>
  );
}
