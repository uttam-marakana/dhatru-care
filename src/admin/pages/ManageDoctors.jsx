import { useEffect, useState } from "react";

import { getDoctors, deleteDoctor } from "../../api/doctorsApi";

import DoctorsTable from "../components/tables/DoctorsTable";
import DoctorFormModal from "../components/modals/DoctorFormModal";

import AdminHeader from "../components/layout/AdminHeader";
import { Link } from "react-router-dom";

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modal, setModal] = useState(false);

  const load = async () => {
    setDoctors(await getDoctors());
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (doctor) => {
    if (!confirm("Delete doctor?")) return;
    await deleteDoctor(doctor.id);
    load();
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Doctors"
        action={
          <Link to="/admin/upload">
            <button
              onClick={() => {
                setSelectedDoctor(null);
                setModal(true);
              }}
              className="px-4 py-3 bg-[var(--color-primary)] text-white rounded-lg"
            >
              Add Doctor
            </button>
          </Link>
        }
      />

      <DoctorsTable
        doctors={doctors}
        onEdit={(doc) => {
          setSelectedDoctor(doc);
          setModal(true);
        }}
        onDelete={handleDelete}
      />

      {modal && (
        <DoctorFormModal
          doctor={selectedDoctor}
          onClose={() => setModal(false)}
          onSaved={load}
        />
      )}
    </div>
  );
}
