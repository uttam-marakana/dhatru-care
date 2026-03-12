export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div
      className="
      flex flex-col
      items-center
      justify-center
      gap-4
      py-12
      "
    >
      {/* SPINNER */}

      <div
        className="
        w-8 h-8
        border-4
        border-[var(--border)]
        border-t-[var(--color-primary)]
        rounded-full
        animate-spin
        "
      />

      {/* TEXT */}

      <p className="text-sm text-[var(--text-secondary)]">{text}</p>
    </div>
  );
}
