import { runBulkUpload } from "../../scripts/bulkUpload";

export default function BulkUpload() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Bulk JSON Upload</h1>

      <button
        onClick={runBulkUpload}
        className="bg-primary text-white px-6 py-3 rounded-lg"
      >
        Upload All Data
      </button>
    </div>
  );
}
