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

  const selected = options.find((o) => o.value === value)?.label || placeholder;

  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="
        w-full h-11 px-3 pr-10 rounded-lg border
        border-[var(--border)]
        bg-[var(--surface)]
        text-[var(--text)]
        text-left text-sm
        flex items-center
        focus:outline-none
        focus:ring-2 focus:ring-[var(--color-primary)]
        "
      >
        <span className="truncate">{selected}</span>

        <FaChevronDown
          size={12}
          className={`absolute right-3 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menu */}
      {open && (
        <div
          className="
          absolute z-50 mt-2 w-full rounded-lg
          border border-[var(--border)]
          bg-[var(--surface)]
          shadow-lg overflow-hidden
          "
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="
              w-full text-left px-3 py-2 text-sm
              text-[var(--text)]
              hover:bg-[var(--card)]
              transition
              "
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
