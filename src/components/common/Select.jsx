import { forwardRef } from "react";

const Select = forwardRef(
  ({ className = "", error, children, ...props }, ref) => {
    return (
      <div className="w-full">
        <select
          ref={ref}
          className="
        w-full px-4 py-3 rounded-lg border
        bg-[var(--surface)]
        border-[var(--border)]
        text-[var(--text)]
        focus:outline-none
        focus:ring-2 focus:ring-[var(--color-main)]
        appearance-none
        disabled:opacity-60
        "
          {...props}
        >
          {children}
        </select>

        {error && (
          <p className="mt-1 text-sm text-[var(--color-error)]">{error}</p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
