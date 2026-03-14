import { useEffect, useState } from "react";

import { getAllDepartments, deleteDepartment } from "../../api/departmentsApi";

import AdminHeader from "../components/layout/AdminHeader";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import DepartmentForm from "../components/forms/DepartmentForm";

import AdminTable from "../components/common/AdminTable";

export default function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const [modal, setModal] = useState(false);

  const load = async () => {
    const data = await getAllDepartments();
    setDepartments(data);
  };

  useEffect(() => {
    load();
  }, []);

  const confirmDelete = async () => {
    await deleteDepartment(deleteItem.id);
    setDeleteItem(null);
    load();
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Departments"
        description="Manage hospital departments"
        action={
          <button
            onClick={() => setModal(true)}
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
                onClick={() => setModal(true)}
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

      {modal && (
        <div className="glass p-6">
          <DepartmentForm />
        </div>
      )}

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
