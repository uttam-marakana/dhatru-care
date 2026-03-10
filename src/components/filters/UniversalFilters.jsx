import { useState, useEffect } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { useDebounce } from "../../hooks/useDebounce";

export default function UniversalFilters({
  schema = [],
  filters = {},
  onChange,
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  const debouncedSearch = useDebounce(localFilters.search || "", 400);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    onChange?.({
      ...localFilters,
      search: debouncedSearch,
    });
  }, [debouncedSearch]);

  const updateField = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (key !== "search") {
      onChange?.({
        ...localFilters,
        [key]: value,
      });
    }
  };

  const resetFilters = () => {
    const cleared = {};
    schema.forEach((f) => (cleared[f.key] = ""));
    setLocalFilters(cleared);
    onChange?.(cleared);
  };

  return (
    <div className="space-y-5">
      {schema.map((field) => {
        if (field.type === "search") {
          return (
            <div key={field.key}>
              <label className="block text-sm mb-2 text-[var(--muted)]">
                {field.label}
              </label>

              <div className="relative">
                <input
                  value={localFilters[field.key] || ""}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg bg-[var(--card)] border border-[var(--border)] pl-10 pr-4 py-2.5"
                />

                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted)]" />
              </div>
            </div>
          );
        }

        if (field.type === "select") {
          return (
            <div key={field.key} className="relative">
              <label className="block text-sm mb-2 text-[var(--muted)]">
                {field.label}
              </label>

              <select
                value={localFilters[field.key] || ""}
                onChange={(e) => updateField(field.key, e.target.value)}
                className="w-full appearance-none rounded-lg bg-[var(--card)] border border-[var(--border)] px-4 pr-10 py-2.5"
              >
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <FaChevronDown className="absolute right-3 top-[42px] text-xs text-[var(--muted)] pointer-events-none" />
            </div>
          );
        }

        return null;
      })}

      <button
        onClick={resetFilters}
        className="w-full border border-[var(--border)] py-2 rounded-lg hover:bg-[var(--card)]"
      >
        Clear Filters
      </button>
    </div>
  );
}
