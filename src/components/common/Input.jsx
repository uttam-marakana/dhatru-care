import { forwardRef } from "react";

const Input = forwardRef(({ className = "", error, ...props }, ref) => {
  return (
    <div className="w-full">
      <input
        ref={ref}
        className={`
        w-full px-4 py-3 rounded-lg border
        bg-[var(--surface)]
        border-[var(--border)]
        text-[var(--text)]
        placeholder:text-[var(--muted)]
        focus:ring-2 focus:ring-[var(--color-main)]
        focus:border-[var(--color-main)]
        transition
        ${error ? "border-[var(--color-error)]" : ""}
        ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-sm mt-1 text-[var(--color-error)]">{error}</p>
      )}
    </div>
  );
});

export default Input;
