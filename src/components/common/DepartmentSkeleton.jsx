export default function DepartmentSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm animate-pulse h-full flex flex-col">
      <div className="aspect-square bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-6xl opacity-50">
        {/* Placeholder icon area */}
      </div>
      <div className="p-6 md:p-8 flex flex-col grow">
        <div className="h-9 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded mb-3" />
        <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
        <div className="mt-auto h-10 w-full bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}
