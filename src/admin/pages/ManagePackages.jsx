import { useEffect, useState, useMemo } from "react";

import { getPackages, deletePackage } from "../../api/packagesApi";

import AdminHeader from "../components/layout/AdminHeader";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import PackageFormModal from "../components/modals/PackageFormModal";
import AdminTable from "../components/common/AdminTable";

import { notifySuccess, notifyError } from "../../utils/toast";

const PAGE_SIZE = 10;

export default function ManagePackages() {
  const [packages, setPackages] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
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
    try {
      await deletePackage(deleteItem.id);
      notifySuccess("Package deleted");
      setDeleteItem(null);
      load();
    } catch {
      notifyError("Failed to delete package");
    }
  };

  /* PAGINATION */

  const totalPages = Math.ceil(packages.length / PAGE_SIZE);

  const paginatedPackages = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return packages.slice(start, start + PAGE_SIZE);
  }, [packages, page]);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Packages"
        description="Manage health packages"
        action={
          <button
            onClick={() => {
              setSelectedPackage(null);
              setModal(true);
            }}
            className="px-4 py-3 bg-[var(--color-primary)] text-white rounded-lg"
          >
            Add Package
          </button>
        }
      />

      {/* TABLE */}

      <AdminTable
        data={paginatedPackages}
        columns={["Name", "Price", "Duration", "Featured", "Actions"]}
        renderRow={(p) => (
          <tr
            key={p.id}
            className="border-b border-[var(--border)] hover:bg-[var(--card)]"
          >
            <td className="p-4 font-medium">{p.name}</td>
            <td className="p-4">₹{p.price}</td>
            <td className="p-4">{p.duration}</td>
            <td className="p-4">{p.isFeatured ? "Yes" : "No"}</td>

            <td className="p-4 flex gap-3">
              <button
                onClick={() => {
                  setSelectedPackage(p);
                  setModal(true);
                }}
                className="text-[var(--color-primary)]"
              >
                Edit
              </button>

              <button
                onClick={() => setDeleteItem(p)}
                className="text-[var(--color-error)]"
              >
                Delete
              </button>
            </td>
          </tr>
        )}
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

      {/* FORM MODAL */}

      {modal && (
        <PackageFormModal
          open={modal}
          pkg={selectedPackage}
          onClose={() => setModal(false)}
          onSaved={load}
        />
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
