import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import AdminHeader from '../components/layout/AdminHeader';
import AdminTable from '../components/common/AdminTable';
import PatientForm from '../components/forms/PatientForm';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import EmptyState from '../components/common/EmptyState';
import {
  fetchPatients,
  createPatient,
  updatePatient,
  deletePatient,
  subscribePatients,
} from '../../api/patientApi';
import { useAuth } from '../../context/AuthContext';

import TableActions from '../components/common/TableActions';

export default function ManagePatients() {
  const { tenantId } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Load initial patients
  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (error) {
        console.error('Load patients error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  // Real-time subscription
  useEffect(() => {
    if (!tenantId) return;

    const unsubscribe = subscribePatients(tenantId, (data) => {
      setPatients(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [tenantId]);

  const handleCreateSuccess = () => {
    setShowForm(false);
    setSelectedPatient(null);
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const columns = [
    { key: 'name', header: 'Name', render: (p) => p.name },
    { key: 'phone', header: 'Phone', render: (p) => p.phone },
    { key: 'email', header: 'Email', render: (p) => p.email || '-' },
    { key: 'age', header: 'Age', render: (p) => p.age || '-' },
    {
      key: 'actions',
      header: 'Actions',
      render: (patient) => (
        <TableActions
          onEdit={() => handleEdit(patient)}
          onDelete={() => handleDelete(patient.id)}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div>Loading patients...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Manage Patients"
        description="View and manage patient records"
        rightContent={
          <Button onClick={() => setShowForm(true)} iconLeft={<FaPlus />}>
            Add Patient
          </Button>
        }
      />

      {patients.length === 0 ? (
        <EmptyState
          title="No patients found"
          description="Create your first patient record"
          actionText="Add Patient"
          onAction={() => setShowForm(true)}
        />
      ) : (
        <AdminTable
          data={patients}
          columns={columns}
          searchKeys={['name', 'phone']}
          pageSize={20}
        />
      )}

      {/* Patient Form Modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <PatientForm
          patient={selectedPatient}
          onSuccess={handleCreateSuccess}
          onCancel={() => {
            setShowForm(false);
            setSelectedPatient(null);
          }}
        />
      </Modal>
    </div>
  );
}
