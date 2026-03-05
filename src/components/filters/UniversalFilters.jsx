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

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

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
    <div className="w-full space-y-5">
      {fields.map((field) => {
        if (field.type === "search") {
          return (
            <div key={field.key}>
              <label className="block text-sm mb-2 text-gray-300">
                {field.label}
              </label>
              <div className="relative">
                <input
                  value={localFilters[field.key] || ""}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg bg-gray-800/70 border border-white/10 pl-10 pr-4 py-2.5 text-white focus:ring-2 focus:ring-blue-400"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              </div>
            </div>
          );
        }

        if (field.type === "select") {
          return (
            <div key={field.key} className="relative">
              <label className="block text-sm mb-2 text-gray-300">
                {field.label}
              </label>
              <select
                value={localFilters[field.key] || ""}
                onChange={(e) => updateField(field.key, e.target.value)}
                className="w-full appearance-none rounded-lg bg-gray-800/70 border border-white/10 px-4 pr-10 py-2.5 text-white focus:ring-2 focus:ring-blue-400"
              >
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-[42px] text-gray-400 text-xs pointer-events-none" />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
