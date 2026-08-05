import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaChevronDown } from "react-icons/fa";

export default function CustomSelect({
  value,
  options = [],
  onChange,
  placeholder = "Select",
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0, openUp: false });
  const ref = useRef(null);

  const getValue = (o) => o.value ?? o.id;
  const getLabel = (o) => o.label ?? o.name;

  const selectedItem = options.find((o) => getValue(o) === value);

  /* --- Close on outside click / scroll / resize ----------- */
  useEffect(() => {
    if (!open || disabled) return;

    const handlePointer = (e) => {
      if (
        ref.current?.contains(e.target) ||
        (e.target?.dataset && e.target.dataset.customSelectOption)
      ) {
        return;
      }
      setOpen(false);
    };

    const handleScroll = () => setOpen(false);
    const handleResize = () => setOpen(false);

    document.addEventListener("mousedown", handlePointer, true);
    document.addEventListener("touchstart", handlePointer, true);
    document.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handlePointer, true);
      document.removeEventListener("touchstart", handlePointer, true);
      document.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  /* --- Compute viewport-aware position ----------- */
  const computePosition = () => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const dropdownHeight = Math.min(options.length * 40 + 16, 240);
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    const openUp = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

    // Clamp horizontally so the dropdown never overflows the viewport on mobile
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - rect.width - 8));

    setPos({
      top: openUp ? rect.top - 8 : rect.bottom + 8,
      left,
      width: rect.width,
      openUp,
    });
  };

const toggle = () => {
    if (disabled) return;
    if (!open) computePosition();
    setOpen((p) => !p);
  };

  return (
    <div ref={ref} className="relative w-full">
      {/* --- TRIGGER ----------- */}
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        className={`
          relative w-full h-11 px-3 pr-10 rounded-lg border
          border-[var(--border)]
          bg-[var(--surface)]
          text-[var(--text)]
          text-left text-sm
          flex items-center
          focus:outline-none
          focus:ring-2 focus:ring-[var(--color-primary)]
          ${
            disabled
              ? "opacity-70 cursor-not-allowed"
              : "cursor-pointer"
          }
        `}
      >
        <span className="truncate">
          {selectedItem ? getLabel(selectedItem) : placeholder}
        </span>

        <FaChevronDown
          size={12}
          className={`absolute right-3 transition-transform ${
            disabled ? "opacity-50" : open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* --- DROPDOWN (portal to body to escape clipping contexts) ----------- */}
      {open && !disabled &&
        createPortal(
          <div
            role="listbox"
            data-custom-select-dropdown
            className="
              fixed z-[9999] rounded-lg
              border border-[var(--border)]
              bg-[var(--surface)]
              shadow-lg
              max-h-60 overflow-y-auto ui-dropdown-scroll
            "
            style={{
              top: pos.top,
              left: pos.left,
              width: pos.width,
              maxWidth: `calc(100vw - 16px)`,
            }}
          >
            {options.map((opt) => {
              const val = getValue(opt);
              const label = getLabel(opt);
              const isActive = value === val;

              return (
                <button
                  key={val}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  data-custom-select-option
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
          </div>,
          document.body,
        )}
    </div>
  );
}
