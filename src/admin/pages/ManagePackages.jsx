import { useEffect, useState, useMemo } from "react";

import { getPackages, deletePackage } from "../../api/packagesApi";

import PackagesTable from "../components/tables/PackagesTable";
import PackageForm from "../components/forms/PackageForm";

import AdminHeader from "../components/layout/AdminHeader";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";

const PAGE_SIZE = 10;

export default function ManagePackages() {
  const [packages, setPackages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const [page, setPage] = useState(1);

  const load = async () => {
    const data = await getPackages();
    setPackages(data);
  };

  useEffect(() => {
    load();
  }, []);

  const confirmDelete = async () => {
    await deletePackage(deleteItem.id);
    setDeleteItem(null);
    load();
  };

  /* PAGINATION */

  const totalPages = Math.ceil(packages.length / PAGE_SIZE);

  const paginatedPackages = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return packages.slice(start, start + PAGE_SIZE);
  }, [packages, page]);

  return (
    <div className="space-y-6">
      <AdminHeader title="Packages" description="Manage health packages" />

      {/* FORM */}

      <div className="glass p-6">
        <PackageForm initialData={editing} />
      </div>

      {/* TABLE */}

      <PackagesTable
        packages={paginatedPackages}
        onEdit={(p) => setEditing(p)}
        onDelete={(p) => setDeleteItem(p)}
      />

      {/* PAGINATION */}

      {packages.length > PAGE_SIZE && (
        <div className="flex justify-end gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border border-[var(--border)] rounded-lg"
          >
            Previous
          </button>

          <span className="text-[var(--muted)]">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border border-[var(--border)] rounded-lg"
          >
            Next
          </button>
        </div>
      )}

      {/* DELETE MODAL */}

      <ConfirmDeleteModal
        open={!!deleteItem}
        title="Delete Package"
        description="Are you sure you want to delete this package?"
        onConfirm={confirmDelete}
        onClose={() => setDeleteItem(null)}
      />
    </div>
  );
}
