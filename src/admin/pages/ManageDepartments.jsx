import { useEffect, useState } from "react";

import { getAllDepartments, deleteDepartment } from "../../api/departmentsApi";

import AdminHeader from "../components/layout/AdminHeader";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import DepartmentFormModal from "../components/modals/DepartmentFormModal";

import AdminTable from "../components/common/AdminTable";

import { notifySuccess, notifyError } from "../../utils/toast";

export default function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);

  const [modal, setModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const load = async () => {
    const data = await getAllDepartments();
    setDepartments(data);
  };

  useEffect(() => {
    load();
  }, []);

  const confirmDelete = async () => {
    try {
      await deleteDepartment(deleteItem.id);
      notifySuccess("Department deleted");
      setDeleteItem(null);
      load();
    } catch {
      notifyError("Failed to delete department");
    }
  };

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

      <AdminTable
        data={departments}
        columns={["Name", "Description", "Actions"]}
        renderRow={(d) => (
          <tr
            key={d.id}
            className="border-b border-[var(--border)] hover:bg-[var(--card)]"
          >
            <td className="p-4 font-medium">{d.name}</td>
            <td className="p-4">{d.description}</td>

            <td className="p-4 flex gap-3">
              <button
                onClick={() => {
                  setSelectedDepartment(d);
                  setModal(true);
                }}
                className="text-[var(--color-primary)]"
              >
                Edit
              </button>

              <button
                onClick={() => setDeleteItem(d)}
                className="text-[var(--color-error)]"
              >
                Delete
              </button>
            </td>
          </tr>
        )}
      />

      {/* --- FORM MODAL ----------- */}

      {modal && (
        <DepartmentFormModal
          open={modal}
          department={selectedDepartment}
          onClose={() => setModal(false)}
          onSaved={load}
        />
      )}

      {/* --- DELETE MODAL ----------- */}

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
