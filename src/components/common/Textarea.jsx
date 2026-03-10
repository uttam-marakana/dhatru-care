import { forwardRef } from "react";

const Textarea = forwardRef(
  ({ rows = 4, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          rows={rows}
          aria-invalid={!!error}
          className={`
            w-full
            px-5 py-3
            rounded-xl
            border
            
            bg-[var(--surface)]
            border-[var(--border)]
            text-[var(--text)]
            placeholder:text-[var(--muted)]
            
            min-h-[120px]
            
            focus:outline-none
            focus:ring-2
            focus:ring-[var(--color-primary)]
            focus:border-[var(--color-primary)]
            
            transition-all duration-200
            
            resize-none
            
            ${error ? "border-[var(--color-error)] focus:ring-[var(--color-error)]" : ""}
            
            ${className}
          `}
          {...props}
        />

        {error && (
          <p className="mt-1 text-sm text-[var(--color-error)]">{error}</p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
