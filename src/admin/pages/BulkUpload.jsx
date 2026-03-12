import AdminHeader from "../components/layout/AdminHeader";
import { runBulkUpload } from "../../scripts/bulkUpload";

export default function BulkUpload() {
  return (
    <div className="space-y-6">
      <AdminHeader
        title="Bulk Upload"
        description="Upload entire dataset from JSON"
      />

      <button
        onClick={runBulkUpload}
        className="
        px-6 py-3
        bg-[var(--color-primary)]
        text-white
        rounded-lg
        hover:opacity-90
        "
      >
        Upload JSON Data
      </button>
    </div>
  );
}
