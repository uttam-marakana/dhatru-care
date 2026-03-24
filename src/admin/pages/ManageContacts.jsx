import { useEffect, useState, useMemo } from "react";
import { subscribeContacts, updateContactMeta } from "../../api/contactApi";

import { notifySuccess, notifyError } from "../../utils/toast";

import ContactMessagesTable from "../components/tables/ContactMessagesTable";
import ContactAnalytics from "../components/common/ContactAnalytics";
import AdminHeader from "../components/layout/AdminHeader";

const PAGE_SIZE = 10;

export default function ManageContacts() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loadingId, setLoadingId] = useState(null);

  /* --- SUBSCRIBE ----------- */
  useEffect(() => {
    const unsub = subscribeContacts(setMessages);
    return () => unsub();
  }, []);

  /* --- FILTER ----------- */
  const filtered = useMemo(() => {
    let data = [...messages];

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (m) =>
          m.name?.toLowerCase().includes(q) ||
          m.email?.toLowerCase().includes(q) ||
          m.subject?.toLowerCase().includes(q),
      );
    }

    if (statusFilter !== "all") {
      data = data.filter(
        (m) => (m.status || "new").toLowerCase() === statusFilter,
      );
    }

    return data;
  }, [messages, search, statusFilter]);

  /* --- PAGINATION RESET ----------- */
  useEffect(() => setPage(1), [search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  /* --- UPDATE ----------- */
  const handleUpdate = async (id, payload) => {
    try {
      setLoadingId(id);
      await updateContactMeta(id, payload);
      notifySuccess("Updated successfully");
    } catch (err) {
      console.error(err);
      notifyError("Update failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Contact Messages"
        description="Manage user inquiries"
      />

      {/* 🔥 ANALYTICS (TOP PRIORITY) */}
      <ContactAnalytics data={messages} />

      {/* --- FILTERS ----------- */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <input
          type="search"
          placeholder="Search name, email, subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ui-input w-full"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="ui-select w-full"
        >
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      {/* --- TABLE CONTAINER ----------- */}
      <div className="p-4 rounded-xl bg-[var(--card)] border">
        {/* 🔥 EMPTY STATE */}
        {messages.length === 0 ? (
          <div className="text-center py-10 text-[var(--muted)]">
            No contact messages yet
          </div>
        ) : (
          <ContactMessagesTable
            messages={paginated}
            onUpdate={handleUpdate}
            loadingId={loadingId}
          />
        )}
      </div>

      {/* --- PAGINATION ----------- */}
      {filtered.length > PAGE_SIZE && (
        <div className="flex flex-wrap justify-center items-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm text-[var(--muted)]">
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
