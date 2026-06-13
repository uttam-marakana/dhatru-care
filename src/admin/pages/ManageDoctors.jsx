import { useEffect, useState } from 'react';
import { getDoctors, deleteDoctor } from '../../api/doctorsApi';

import AdminTable from '../components/common/AdminTable';
import DoctorFormModal from '../components/modals/DoctorFormModal';
import AdminHeader from '../components/layout/AdminHeader';

import TableActions from '../components/common/TableActions';

import { notifySuccess, notifyError } from '../../utils/toast';

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
    if (!confirm('Delete doctor?')) return;

    try {
      await deleteDoctor(doc.id);
      notifySuccess('Doctor deleted');
      load();
    } catch {
      notifyError('Failed to delete doctor');
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
        columns={['Name', 'Specialty', 'Department', 'Experience', 'Actions']}
        renderRow={(doc) => (
          <tr key={doc.id} className="hover:bg-[var(--card)] transition-colors duration-200">
            <td className="p-6 font-medium w-[25%]">{doc.name}</td>

            <td className="p-6 w-[20%]">{doc.specialty}</td>

            <td className="p-6 w-[25%] truncate">{doc.departmentId}</td>

            <td className="p-6 w-[20%]">{doc.experience} yrs</td>

            <td className="p-6 w-[10%]">
              <TableActions
                onEdit={() => {
                  setSelectedDoctor(doc);
                  setModal(true);
                }}
                onDelete={() => handleDelete(doc)}
              />
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
