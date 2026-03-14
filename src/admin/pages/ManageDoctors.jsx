import { useEffect, useState } from "react";
import { getDoctors, deleteDoctor } from "../../api/doctorsApi";

import AdminTable from "../components/common/AdminTable";
import DoctorFormModal from "../components/modals/DoctorFormModal";
import AdminHeader from "../components/layout/AdminHeader";

import { notifySuccess, notifyError } from "../../utils/toast";

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const load = async () => {
    const data = await getDoctors();
    setDoctors(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (doc) => {
    if (!confirm("Delete doctor?")) return;

    try {
      await deleteDoctor(doc.id);
      notifySuccess("Doctor deleted");
      load();
    } catch {
      notifyError("Failed to delete doctor");
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Doctors"
        action={
          <button
            onClick={() => {
              setSelectedDoctor(null);
              setModal(true);
            }}
            className="px-4 py-3 bg-[var(--color-primary)] text-white rounded-lg"
          >
            Add Doctor
          </button>
        }
      />

      <AdminTable
        data={doctors}
        columns={["Name", "Specialty", "Department", "Experience", "Actions"]}
        renderRow={(doc) => (
          <tr
            key={doc.id}
            className="border-b border-[var(--border)] hover:bg-[var(--card)]"
          >
            <td className="p-4 font-medium">{doc.name}</td>
            <td className="p-4">{doc.specialty}</td>
            <td className="p-4">{doc.departmentId}</td>
            <td className="p-4">{doc.experience} yrs</td>

            <td className="p-4 flex gap-3">
              <button
                onClick={() => {
                  setSelectedDoctor(doc);
                  setModal(true);
                }}
                className="text-[var(--color-primary)]"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(doc)}
                className="text-[var(--color-error)]"
              >
                Delete
              </button>
            </td>
          </tr>
        )}
      />

      {modal && (
        <DoctorFormModal
          open={modal}
          doctor={selectedDoctor}
          onClose={() => setModal(false)}
          onSaved={load}
        />
      )}
    </div>
  );
}
