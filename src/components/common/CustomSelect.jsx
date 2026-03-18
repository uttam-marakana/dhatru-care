import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function CustomSelect({
  value,
  options = [],
  onChange,
  placeholder = "Select",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const getValue = (o) => o.value ?? o.id;
  const getLabel = (o) => o.label ?? o.name;

  const selectedItem = options.find((o) => getValue(o) === value);

  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {/* TRIGGER */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="
          relative w-full h-11 px-3 pr-10 rounded-lg border
          border-[var(--border)]
          bg-[var(--surface)]
          text-[var(--text)]
          text-left text-sm
          flex items-center
          focus:outline-none
          focus:ring-2 focus:ring-[var(--color-primary)]
        "
      >
        <span className="truncate">
          {selectedItem ? getLabel(selectedItem) : placeholder}
        </span>

        <FaChevronDown
          size={12}
          className={`absolute right-3 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute left-0 top-full z-[9999] mt-2 w-full rounded-lg
            border border-[var(--border)]
            bg-[var(--surface)]
            shadow-lg
            max-h-60 overflow-y-auto ui-dropdown-scroll
          "
        >
          {options.map((opt) => {
            const val = getValue(opt);
            const label = getLabel(opt);
            const isActive = value === val;

            return (
              <button
                key={val}
                type="button"
                onClick={() => {
                  onChange(val);
                  setOpen(false);
                }}
                className={`
                  w-full text-left px-3 py-2 text-sm transition
                  ${
                    isActive
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--text)] hover:bg-[var(--card)]"
                  }
                `}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
