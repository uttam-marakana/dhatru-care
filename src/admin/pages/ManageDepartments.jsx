import { useEffect, useState } from "react";

import { getAllDepartments, deleteDepartment } from "../../api/departmentsApi";

import DepartmentsTable from "../components/tables/DepartmentsTable";
import DepartmentForm from "../components/forms/DepartmentForm";

import AdminHeader from "../components/layout/AdminHeader";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";

export default function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

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
      />

      {/* FORM */}

      <div className="glass p-6">
        <DepartmentForm initialData={editing} />
      </div>

      {/* TABLE */}

      <DepartmentsTable
        departments={departments}
        onEdit={(d) => setEditing(d)}
        onDelete={(d) => setDeleteItem(d)}
      />

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
