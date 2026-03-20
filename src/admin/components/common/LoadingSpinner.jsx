export default function LoadingSpinner({
  text = "Loading...",
  fullPage = false,
}) {
  return (
    <div
      className={`
        flex flex-col
        items-center
        justify-center
        gap-5
        px-4
        py-12
        ${fullPage ? "min-h-[70vh]" : ""}
      `}
    >
      {/* --- SPINNER AREA ----------- */}

      <div className="relative flex items-center justify-center">
        {/* --- Pulse Ring ----------- */}
        <span
          className="
            absolute
            w-14 h-14
            rounded-full
            bg-[var(--color-primary)]
            opacity-20
            animate-ping
          "
        />

        {/* --- Spinner ----------- */}
        <span
          className="
            w-10 h-10
            border-[3px]
            border-[var(--border)]
            border-t-[var(--color-primary)]
            rounded-full
            animate-spin
          "
        />
      </div>

      {/* --- TEXT + ANIMATED DOTS ----------- */}

      {text && (
        <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
          {text}

          <span className="flex gap-1 ml-1">
            <span className="w-1.5 h-1.5 bg-[var(--text-secondary)] rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 bg-[var(--text-secondary)] rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 bg-[var(--text-secondary)] rounded-full animate-bounce [animation-delay:300ms]" />
          </span>
        </p>
      )}
    </div>
  );
}
