import { useEffect, useState, useMemo } from "react";
import {
  subscribeAppointments,
  updateAppointmentStatus,
} from "../../api/appointmentsApi";

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [view, setView] = useState("list");
  const [page, setPage] = useState(1);

  const perPage = 10;

  useEffect(() => {
    const unsub = subscribeAppointments(setAppointments);
    return () => unsub();
  }, []);

  /* -------- Analytics -------- */

  const total = appointments.length;
  const approved = appointments.filter((a) => a.status === "approved").length;
  const pending = appointments.filter((a) => a.status === "pending").length;
  const rejected = appointments.filter((a) => a.status === "rejected").length;

  /* -------- Filtering -------- */

  const filtered = useMemo(() => {
    let data = appointments;

    if (search) {
      data = data.filter((a) =>
        a.patientName?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (statusFilter) {
      data = data.filter((a) => a.status === statusFilter);
    }

    return data;
  }, [appointments, search, statusFilter]);

  /* -------- Pagination -------- */

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  /* -------- Calendar -------- */

  const generateMonthDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const days = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: days }, (_, i) => {
      const day = i + 1;
      return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    });
  };

  const calendarDays = generateMonthDays();

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Manage Appointments</h1>

      {/* Analytics */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-100 rounded">Total: {total}</div>
        <div className="p-4 bg-green-100 rounded">Approved: {approved}</div>
        <div className="p-4 bg-yellow-100 rounded">Pending: {pending}</div>
        <div className="p-4 bg-red-100 rounded">Rejected: {rejected}</div>
      </div>

      {/* Search + Filter */}

      <div className="flex gap-3">
        <input
          placeholder="Search patient"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Appointment List */}

      <div className="space-y-4">
        {paginated.map((a) => (
          <div
            key={a.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{a.patientName}</p>
              <p>
                {a.date} — {a.time}
              </p>
              <p>{a.department}</p>
              <p>Status: {a.status}</p>
            </div>

            <select
              value={a.status}
              onChange={(e) => updateAppointmentStatus(a.id, e.target.value)}
              className="border p-2 rounded"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        ))}
      </div>

      {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex gap-4 justify-center">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="border px-4 py-2 rounded"
          >
            Prev
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="border px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}

      {/* Calendar View */}

      {calendarDays && (
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
          {calendarDays.map((date) => {
            const dayAppointments = appointments.filter((a) => a.date === date);

            return (
              <div key={date} className="border rounded p-2 min-h-30">
                <p className="font-semibold text-sm mb-2">{date}</p>

                {dayAppointments.map((a) => (
                  <div
                    key={a.id}
                    className="text-xs bg-gray-100 p-1 rounded mb-1"
                  >
                    {a.time} — {a.patientName}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
