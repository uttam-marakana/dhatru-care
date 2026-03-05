export default function DepartmentDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--bg)] animate-pulse">
      {/* Banner */}
      <div className="bg-[var(--card)] py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="h-32 w-32 mx-auto bg-[var(--border)] rounded-full mb-6" />

          <div className="h-12 w-3/4 bg-[var(--border)] rounded mx-auto mb-4" />

          <div className="h-6 w-2/3 bg-[var(--border)] rounded mx-auto" />
        </div>
      </div>

      {/* Content */}
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="h-10 w-1/2 bg-[var(--border)] rounded" />

            <div className="space-y-4">
              <div className="h-6 w-full bg-[var(--border)] rounded" />
              <div className="h-6 w-full bg-[var(--border)] rounded" />
              <div className="h-6 w-3/4 bg-[var(--border)] rounded" />
            </div>
          </div>

          <div className="space-y-8">
            <div className="h-10 w-3/4 bg-[var(--border)] rounded" />

            <div className="space-y-4">
              <div className="h-6 w-full bg-(--border) rounded" />
              <div className="h-6 w-full bg-(--border) rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
