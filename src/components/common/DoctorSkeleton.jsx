export default function DoctorSkeleton() {
  return (
    <div
      className="
        bg-[var(--card)]
        rounded-xl
        border border-[var(--border)]
        shadow-sm
        animate-pulse
        overflow-hidden
      "
    >
      <div className="aspect-square bg-[var(--border)]" />

      <div className="p-6 space-y-4">
        <div className="h-7 w-3/4 bg-[var(--border)] rounded" />

        <div className="h-5 w-1/2 bg-[var(--border)] rounded" />

        <div className="flex gap-4">
          <div className="h-5 w-16 bg-[var(--border)] rounded" />
          <div className="h-5 w-20 bg-[var(--border)] rounded" />
        </div>

        <div className="h-10 w-full bg-[var(--border)] rounded" />
      </div>
    </div>
  );
}
