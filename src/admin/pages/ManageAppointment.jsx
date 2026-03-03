import { useEffect, useState, useMemo } from "react";
import {
  subscribeAppointments,
  updateAppointmentStatus,
} from "../../api/appointmentsApi";

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [view, setView] = useState("list"); // list | calendar
  const [page, setPage] = useState(1);
  const perPage = 10;

  /* ------------  REALTIME SUBSCRIBE ---------------------------------------------- */
  useEffect(() => {
    const unsub = subscribeAppointments(setAppointments);
    return () => unsub();
  }, []);

  /* ------------  ANALYTICS ---------------------------------------------- */
  const total = appointments.length;
  const approved = appointments.filter((a) => a.status === "approved").length;
  const pending = appointments.filter((a) => a.status === "pending").length;
  const rejected = appointments.filter((a) => a.status === "rejected").length;

  /* ------------  FILTER ---------------------------------------------- */
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

  /* ------------  PAGINATION ---------------------------------------------- */
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const totalPages = Math.ceil(filtered.length / perPage);

  /* ------------  CALENDAR ---------------------------------------------- */
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
      {/* ------------  HEADER ---------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Manage Appointments</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded ${view === "list" ? "bg-primary text-white" : "border"}`}
          >
            List
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`px-4 py-2 rounded ${view === "calendar" ? "bg-primary text-white" : "border"}`}
          >
            Calendar
          </button>
        </div>
      </div>

      {/* ------------  ANALYTICS ---------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-100 rounded">Total: {total}</div>
        <div className="p-4 bg-green-100 rounded">Approved: {approved}</div>
        <div className="p-4 bg-yellow-100 rounded">Pending: {pending}</div>
        <div className="p-4 bg-red-100 rounded">Rejected: {rejected}</div>
      </div>

      {/* ------------  FILTER BAR ---------------------------------------------- */}
      {view === "list" && (
        <div className="flex flex-col md:flex-row gap-4">
          <input
            placeholder="Search by patient name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded w-full md:w-64"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded w-full md:w-48"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      )}

      {/* ------------  LIST VIEW ---------------------------------------------- */}
      {view === "list" && (
        <>
          <div className="space-y-4">
            {paginated.map((a) => (
              <div
                key={a.id}
                className="p-4 border rounded-lg flex flex-col md:flex-row md:justify-between gap-4"
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
                  onChange={(e) =>
                    updateAppointmentStatus(a.id, e.target.value)
                  }
                  className="p-2 border rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 border rounded"
              >
                Prev
              </button>

              <span className="px-4 py-2">
                {page} / {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 border rounded"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* ------------  CALENDAR VIEW ---------------------------------------------- */}
      {view === "calendar" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {calendarDays.map((date) => {
            const dayAppointments = appointments.filter((a) => a.date === date);

            return (
              <div key={date} className="border rounded p-2 min-h-[120px]">
                <p className="text-sm font-semibold mb-2">{date}</p>

                {dayAppointments.map((a) => (
                  <div
                    key={a.id}
                    className="text-xs bg-gray-100 rounded p-1 mb-1"
                  >
                    {a.time} - {a.patientName}
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
