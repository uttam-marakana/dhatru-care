import { useEffect, useState, useMemo } from "react";

import {
  subscribeAppointments,
  updateAppointmentStatus,
} from "../../api/appointmentsApi";

import AppointmentsTable from "../components/tables/AppointmentsTable";
import AdminHeader from "../components/layout/AdminHeader";

const PAGE_SIZE = 10;

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const unsub = subscribeAppointments(setAppointments);
    return () => unsub();
  }, []);

  /* SEARCH FILTER */

  const filteredAppointments = useMemo(() => {
    if (!search) return appointments;

    const q = search.toLowerCase();

    return appointments.filter(
      (a) =>
        a.patientName?.toLowerCase().includes(q) ||
        a.doctorName?.toLowerCase().includes(q) ||
        a.department?.toLowerCase().includes(q),
    );
  }, [appointments, search]);

  /* RESET PAGE WHEN SEARCH CHANGES */

  useEffect(() => {
    setPage(1);
  }, [search]);

  /* PAGINATION */

  const totalPages = Math.ceil(filteredAppointments.length / PAGE_SIZE);

  const paginatedAppointments = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredAppointments.slice(start, start + PAGE_SIZE);
  }, [filteredAppointments, page]);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Appointments"
        description="Manage hospital appointments"
      />

      {/* SEARCH BAR */}

      <div className="max-w-md">
        <input
          type="search"
          placeholder="Search patient, doctor or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ui-input"
        />
      </div>

      {/* TABLE */}

      <AppointmentsTable
        appointments={paginatedAppointments}
        onStatusChange={updateAppointmentStatus}
      />

      {/* PAGINATION */}

      {filteredAppointments.length > PAGE_SIZE && (
        <div className="flex justify-center gap-4 mt-6">
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
    </div>
  );
}
