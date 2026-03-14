import { useEffect, useState, useMemo } from "react";
import { getDoctors, deleteDoctor } from "../../api/doctorsApi";

import DoctorsTable from "../components/tables/DoctorsTable";
import DoctorFormModal from "../components/modals/DoctorFormModal";

import AdminHeader from "../components/layout/AdminHeader";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modal, setModal] = useState(false);

  const [page, setPage] = useState(1);

  /* FILTERS */

  const [filters, setFilters] = useState({
    specialty: "",
    department: "",
  });

  const load = async () => {
    const data = await getDoctors(filters);
    setDoctors(data);
    setPage(1);
  };

  useEffect(() => {
    load();
  }, [filters]);

  const handleDelete = async (doctor) => {
    if (!confirm("Delete doctor?")) return;
    await deleteDoctor(doctor.id);
    load();
  };

  /* PAGINATION */

  const totalPages = Math.ceil(doctors.length / PAGE_SIZE);

  const paginatedDoctors = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return doctors.slice(start, start + PAGE_SIZE);
  }, [doctors, page]);

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

      {/* FILTER BAR */}

      <div className="glass p-4 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Filter by specialty"
          value={filters.specialty}
          onChange={(e) =>
            setFilters((f) => ({ ...f, specialty: e.target.value }))
          }
          className="ui-input max-w-xs"
        />

        <input
          type="text"
          placeholder="Filter by department ID"
          value={filters.department}
          onChange={(e) =>
            setFilters((f) => ({ ...f, department: e.target.value }))
          }
          className="ui-input max-w-xs"
        />

        <button
          onClick={() =>
            setFilters({
              specialty: "",
              department: "",
            })
          }
          className="px-4 py-2 border border-[var(--border)] rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* TABLE */}

      <DoctorsTable
        doctors={paginatedDoctors}
        onEdit={(doc) => {
          setSelectedDoctor(doc);
          setModal(true);
        }}
        onDelete={handleDelete}
      />

      {/* PAGINATION */}

      {doctors.length > PAGE_SIZE && (
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

      {/* MODAL */}

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
