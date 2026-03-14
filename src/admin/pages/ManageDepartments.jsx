import { useEffect, useState, useMemo } from "react";

import { getAllDepartments, deleteDepartment } from "../../api/departmentsApi";

import DepartmentsTable from "../components/tables/DepartmentsTable";
import DepartmentFormModal from "../components/modals/DepartmentFormModal";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";

import AdminHeader from "../components/layout/AdminHeader";

const PAGE_SIZE = 10;

export default function ManageDepartments() {
  const [departments, setDepartments] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [modal, setModal] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);

  const [page, setPage] = useState(1);

  const load = async () => {
    const data = await getAllDepartments();
    setDepartments(data);
  };

  useEffect(() => {
    load();
  }, []);

  /* DELETE */

  const confirmDelete = async () => {
    await deleteDepartment(deleteItem.id);
    setDeleteItem(null);
    load();
  };

  /* PAGINATION */

  const totalPages = Math.ceil(departments.length / PAGE_SIZE);

  const paginatedDepartments = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return departments.slice(start, start + PAGE_SIZE);
  }, [departments, page]);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Departments"
        description="Manage hospital departments"
        action={
          <button
            onClick={() => {
              setSelectedDepartment(null);
              setModal(true);
            }}
            className="px-4 py-3 bg-[var(--color-primary)] text-white rounded-lg"
          >
            Add Department
          </button>
        }
      />

      {/* TABLE */}

      <DepartmentsTable
        departments={paginatedDepartments}
        onEdit={(d) => {
          setSelectedDepartment(d);
          setModal(true);
        }}
        onDelete={(d) => setDeleteItem(d)}
      />

      {/* PAGINATION */}

      {departments.length > PAGE_SIZE && (
        <div className="flex items-center justify-end gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border border-[var(--border)] rounded-lg disabled:opacity-40"
          >
            Previous
          </button>

          <span className="flex items-center text-[var(--muted)]">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border border-[var(--border)] rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* FORM MODAL */}

      {modal && (
        <DepartmentFormModal
          open={modal}
          department={selectedDepartment}
          onClose={() => setModal(false)}
          onSaved={load}
        />
      )}

      {/* DELETE MODAL */}

      <ConfirmDeleteModal
        open={!!deleteItem}
        title="Delete Department"
        description="Are you sure you want to delete this department?"
        onConfirm={confirmDelete}
        onClose={() => setDeleteItem(null)}
      />
    </div>
  );
}
