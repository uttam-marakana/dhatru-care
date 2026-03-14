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
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const [page, setPage] = useState(1);

  useEffect(() => {
    const unsub = subscribeAppointments(setAppointments);
    return () => unsub();
  }, []);

  /* DATE HELPERS */

  const now = new Date();

  const todayString = now.toISOString().split("T")[0];

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const toDate = (a) => new Date(`${a.date}T${a.time}`);

  /* FILTER PIPELINE */

  const filteredAppointments = useMemo(() => {
    let data = [...appointments];

    /* SEARCH */

    if (search) {
      const q = search.toLowerCase();

      data = data.filter(
        (a) =>
          a.patientName?.toLowerCase().includes(q) ||
          a.doctorName?.toLowerCase().includes(q) ||
          a.department?.toLowerCase().includes(q),
      );
    }

    /* STATUS FILTER */

    if (statusFilter !== "all") {
      data = data.filter((a) => a.status === statusFilter);
    }

    /* DATE FILTER */

    if (dateFilter !== "all") {
      data = data.filter((a) => {
        const d = toDate(a);

        if (dateFilter === "today") return a.date === todayString;

        if (dateFilter === "week") return d >= startOfWeek;

        if (dateFilter === "month") return d >= startOfMonth;

        return true;
      });
    }

    return data;
  }, [appointments, search, statusFilter, dateFilter]);

  /* RESET PAGE */

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, dateFilter]);

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

      {/* FILTER BAR */}

      <div className="grid md:grid-cols-3 gap-4">
        {/* SEARCH */}

        <input
          type="search"
          placeholder="Search patient, doctor or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ui-input"
        />

        {/* STATUS FILTER */}

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="ui-select"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rejected">Rejected</option>
        </select>

        {/* DATE FILTER */}

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="ui-select"
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
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
