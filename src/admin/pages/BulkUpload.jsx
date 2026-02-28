import { runBulkUpload } from "../../scripts/bulkUpload";

export default function BulkUpload() {
  return (
    <div className="p-6">
      <button
        onClick={runBulkUpload}
        className="bg-primary text-white px-6 py-3 rounded-lg"
      >
        Upload All JSON Data
      </button>
    </div>
  );
}
