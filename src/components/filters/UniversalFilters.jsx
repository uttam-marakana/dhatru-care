import { useState, useEffect } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { useDebounce } from "../../hooks/useDebounce";

export default function UniversalFilters({
  fields = [],
  filters = {},
  onChange,
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  const debouncedSearch = useDebounce(localFilters.search || "", 400);

  /* sync external updates */
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  /* emit changes */
  useEffect(() => {
    onChange?.({
      ...localFilters,
      search: debouncedSearch,
    });
  }, [debouncedSearch, localFilters]);

  const updateField = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="w-full space-y-4">
      {fields.map((field) => {
        if (field.type === "search") {
          return (
            <div key={field.key}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>

              <div className="relative">
                <input
                  value={localFilters[field.key] || ""}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full border rounded-lg pl-10 pr-3 py-2.5"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          );
        }

        if (field.type === "select") {
          return (
            <div key={field.key} className="relative">
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>

              <select
                value={localFilters[field.key] || ""}
                onChange={(e) => updateField(field.key, e.target.value)}
                className="w-full appearance-none border rounded-lg px-4 pr-10 py-2.5"
              >
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <FaChevronDown className="absolute right-3 top-[38px] text-gray-400 text-sm pointer-events-none" />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
