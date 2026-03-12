import { useEffect, useState } from "react";

import { getPackages, deletePackage } from "../../api/packagesApi";

import PackagesTable from "../components/tables/PackagesTable";
import PackageForm from "../components/forms/PackageForm";

import AdminHeader from "../components/layout/AdminHeader";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";

export default function ManagePackages() {
  const [packages, setPackages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

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

  return (
    <div className="space-y-6">
      <AdminHeader title="Packages" description="Manage health packages" />

      {/* FORM */}

      <div className="glass p-6">
        <PackageForm initialData={editing} />
      </div>

      {/* TABLE */}

      <PackagesTable
        packages={packages}
        onEdit={(p) => setEditing(p)}
        onDelete={(p) => setDeleteItem(p)}
      />

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
