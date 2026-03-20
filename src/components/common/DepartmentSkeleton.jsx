export default function DepartmentSkeleton() {
  return (
    <div
      className="
        bg-[var(--card)]
        rounded-xl
        border border-[var(--border)]
        shadow-sm
        animate-pulse
        overflow-hidden
        h-full flex flex-col
      "
    >
      <div className="aspect-square bg-[var(--border)] flex items-center justify-center opacity-40" />

      <div className="p-6 flex flex-col grow">
        <div className="h-9 w-3/4 bg-[var(--border)] rounded mb-4" />

        <div className="h-5 w-full bg-[var(--border)] rounded mb-3" />

        <div className="h-5 w-2/3 bg-[var(--border)] rounded mb-6" />

        <div className="mt-auto h-10 w-full bg-[var(--border)] rounded" />
      </div>
    </div>
  );
}
