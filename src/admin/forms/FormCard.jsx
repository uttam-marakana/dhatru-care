export default function FormCard({ title, children }) {
  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border p-8">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
      </div>
    </div>
  );
}
