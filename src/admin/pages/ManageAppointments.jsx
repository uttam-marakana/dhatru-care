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

  /* ------------------ REALTIME SUBSCRIBE ------------------ */

  useEffect(() => {
    const unsub = subscribeAppointments(setAppointments);
    return () => unsub();
  }, []);

  /* ------------------ RESET PAGE ON FILTER ------------------ */

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  /* ------------------ ANALYTICS ------------------ */

  const analytics = useMemo(() => {
    const total = appointments.length;

    const approved = appointments.filter((a) => a.status === "approved").length;

    const pending = appointments.filter((a) => a.status === "pending").length;

    const rejected = appointments.filter((a) => a.status === "rejected").length;

    return { total, approved, pending, rejected };
  }, [appointments]);

  /* ------------------ FILTERING ------------------ */

  const filtered = useMemo(() => {
    let data = appointments;

    if (search) {
      const term = search.toLowerCase();

      data = data.filter((a) => a.patientName?.toLowerCase().includes(term));
    }

    if (statusFilter) {
      data = data.filter((a) => a.status === statusFilter);
    }

    return data;
  }, [appointments, search, statusFilter]);

  /* ------------------ PAGINATION ------------------ */

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const totalPages = Math.ceil(filtered.length / perPage);

  /* ------------------ CALENDAR ------------------ */

  const calendarDays = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const days = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: days }, (_, i) => {
      const day = i + 1;

      return `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day,
      ).padStart(2, "0")}`;
    });
  }, []);

  /* ------------------ STATUS UPDATE ------------------ */

  const handleStatusChange = async (id, status) => {
    await updateAppointmentStatus(id, status);
  };

  return (
    <div className="p-6 space-y-8">
      {/* PAGE TITLE */}

      <h1 className="text-3xl font-bold">Manage Appointments</h1>

      {/* ANALYTICS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-100 rounded">Total: {analytics.total}</div>

        <div className="p-4 bg-green-100 rounded">
          Approved: {analytics.approved}
        </div>

        <div className="p-4 bg-yellow-100 rounded">
          Pending: {analytics.pending}
        </div>

        <div className="p-4 bg-red-100 rounded">
          Rejected: {analytics.rejected}
        </div>
      </div>

      {/* SEARCH + FILTER */}

      <div className="flex flex-wrap gap-3">
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

        {/* VIEW TOGGLE */}

        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded ${
              view === "list" ? "bg-blue-600 text-white" : "border"
            }`}
          >
            List
          </button>

          <button
            onClick={() => setView("calendar")}
            className={`px-4 py-2 rounded ${
              view === "calendar" ? "bg-blue-600 text-white" : "border"
            }`}
          >
            Calendar
          </button>
        </div>
      </div>

      {/* LIST VIEW */}

      {view === "list" && (
        <>
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
                  onChange={(e) => handleStatusChange(a.id, e.target.value)}
                  className="border p-2 rounded"
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
            <div className="flex gap-4 justify-center mt-6">
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
        </>
      )}

      {/* CALENDAR VIEW */}

      {view === "calendar" && (
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
          {calendarDays.map((date) => {
            const dayAppointments = appointments.filter((a) => a.date === date);

            return (
              <div key={date} className="border rounded p-2 min-h-[120px]">
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
