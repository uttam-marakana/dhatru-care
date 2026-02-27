export default function DepartmentDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-pulse">
      {/* Top banner skeleton */}
      <div className="bg-gray-200 dark:bg-gray-800 py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <div className="h-32 w-32 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full mb-6" />
            <div className="h-12 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mx-auto mb-4" />
            <div className="h-6 w-2/3 bg-gray-300 dark:bg-gray-700 rounded mx-auto" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="h-10 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="space-y-4">
                <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
              </div>
            </div>
            <div className="space-y-8">
              <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="space-y-4">
                <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
