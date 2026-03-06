import { forwardRef } from "react";

const Textarea = forwardRef(({ rows = 4, error, ...props }, ref) => {
  return (
    <div className="w-full">
      <textarea
        ref={ref}
        rows={rows}
        className="
        w-full px-4 py-3 rounded-lg border
        bg-[var(--surface)]
        border-[var(--border)]
        text-[var(--text)]
        placeholder:text-[var(--muted)]
        focus:ring-2 focus:ring-[var(--color-main)]
        focus:border-[var(--color-main)]
        resize-y
        "
        {...props}
      />

      {error && (
        <p className="text-sm mt-1 text-[var(--color-error)]">{error}</p>
      )}
    </div>
  );
});

export default Textarea;
