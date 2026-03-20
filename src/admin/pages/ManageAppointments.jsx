import { useEffect, useState, useMemo } from "react";

import {
  subscribeAppointments,
  updateAppointmentStatus,
} from "../../api/appointmentsApi";

import { useAuth } from "../../context/AuthContext";

import { notifySuccess, notifyError, notifyConflict } from "../../utils/toast";

import AppointmentsTable from "../components/tables/AppointmentsTable";
import AdminHeader from "../components/layout/AdminHeader";

const PAGE_SIZE = 10;

export default function ManageAppointments() {
  const { user, tenantId } = useAuth();

  const [appointments, setAppointments] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [loadingId, setLoadingId] = useState(null);

  /* --- TENANT SAFE SUBSCRIPTION ----------- */
  useEffect(() => {
    if (!tenantId) return;

    const unsub = subscribeAppointments(tenantId, setAppointments);
    return () => unsub();
  }, [tenantId]);

  /* --- DATE HELPERS ----------- */

  const now = new Date();
  const todayString = now.toISOString().split("T")[0];

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const toDate = (a) => new Date(`${a.date}T${a.time}`);

  /* --- FILTER ----------- */

  const filteredAppointments = useMemo(() => {
    let data = [...appointments];

    if (search) {
      const q = search.toLowerCase();

      data = data.filter(
        (a) =>
          a.patientName?.toLowerCase().includes(q) ||
          a.doctorName?.toLowerCase().includes(q) ||
          a.departmentName?.toLowerCase().includes(q),
      );
    }

    if (statusFilter !== "all") {
      data = data.filter(
        (a) => (a.status || "pending").toLowerCase() === statusFilter,
      );
    }

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

  /* --- REVENUE ----------- */

  const revenueStats = useMemo(() => {
    let total = 0;
    let today = 0;

    filteredAppointments
      .filter((a) =>
        ["completed"].includes((a.status || "").toLowerCase()),
      )
      .forEach((a) => {
        const amount = a.totalAmount || 0;

        total += amount;
        if (a.date === todayString) today += amount;
      });

    return { total, today };
  }, [filteredAppointments, todayString]);

  /* --- PAGINATION ----------- */

  useEffect(() => setPage(1), [search, statusFilter, dateFilter]);

  const totalPages = Math.ceil(filteredAppointments.length / PAGE_SIZE);

  const paginatedAppointments = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredAppointments.slice(start, start + PAGE_SIZE);
  }, [filteredAppointments, page]);

  /* --- STATUS UPDATE ----------- */

  const handleStatusChange = async (id, status) => {
    try {
      setLoadingId(id);

      await updateAppointmentStatus(id, status, {
        userId: user?.uid,
      });

      notifySuccess("Status updated successfully");
    } catch (err) {
      console.error("Status update failed:", err);

      if (err.message === "CONFLICT_UPDATE") {
        notifyConflict();

        // 🔥 auto refresh to sync latest state
        setTimeout(() => window.location.reload(), 1200);
      } else {
        notifyError(err.message || "Update failed");
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Appointments"
        description="Manage hospital appointments"
      />

      {/* --- REVENUE ----------- */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[var(--card)] border">
          <p className="text-sm text-[var(--muted)]">Total Revenue</p>
          <p className="text-2xl font-bold">₹{revenueStats.total}</p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--card)] border">
          <p className="text-sm text-[var(--muted)]">Today Revenue</p>
          <p className="text-2xl font-bold">₹{revenueStats.today}</p>
        </div>
      </div>

      {/* --- FILTERS ----------- */}

      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="search"
          placeholder="Search patient, doctor or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ui-input"
        />

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
              w-full
              px-4 py-2
              rounded-lg
              border
              bg-[var(--card)]
              text-[var(--text)]
              appearance-none
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rejected">Rejected</option>
          </select>

          <span className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
            ▼
          </span>
        </div>

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

      {/* --- TABLE ----------- */}

      <AppointmentsTable
        appointments={paginatedAppointments}
        onStatusChange={handleStatusChange}
        loadingId={loadingId}
      />

      {/* --- PAGINATION ----------- */}

      {filteredAppointments.length > PAGE_SIZE && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Previous
          </button>

          <span className="flex items-center text-[var(--muted)]">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
