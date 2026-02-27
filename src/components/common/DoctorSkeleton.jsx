export default function DoctorSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm animate-pulse">
      <div className="aspect-square bg-gray-200 dark:bg-gray-800" />
      <div className="p-6 space-y-4">
        <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="flex gap-4">
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}
