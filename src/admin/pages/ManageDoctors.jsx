import { useEffect, useState } from "react";
import { getDoctors, deleteDoctor } from "../../api/doctorsApi";

import DoctorsTable from "../components/DoctorsTable";
import DoctorFormModal from "../components/DoctorFormModal";

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadDoctors = async () => {
    setLoading(true);
    const data = await getDoctors();
    setDoctors(data);
    setLoading(false);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleCreate = () => {
    setSelectedDoctor(null);
    setShowModal(true);
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleDelete = async (doctor) => {
    if (!confirm("Delete doctor?")) return;

    await deleteDoctor(doctor.id);
    loadDoctors();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-bold">Doctors</h1>

        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Doctor
        </button>
      </div>

      <DoctorsTable
        doctors={doctors}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <DoctorFormModal
          doctor={selectedDoctor}
          onClose={() => setShowModal(false)}
          onSaved={loadDoctors}
        />
      )}
    </div>
  );
}
