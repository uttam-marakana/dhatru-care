/* --- APPOINTMENT STATUS ----------- */

export const APPOINTMENT_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
};

/* --- STATUS LABELS ----------- */

export const STATUS_LABELS = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

/* --- STATUS COLORS ----------- */

export const STATUS_COLORS = {
  pending: "var(--color-warning)",
  approved: "var(--color-success)",
  rejected: "var(--color-error)",
  cancelled: "var(--muted)",
};

/* --- PAGINATION ----------- */

export const ADMIN_PAGE_SIZE = 10;

/* --- DASHBOARD METRICS ----------- */

export const DASHBOARD_METRICS = [
  {
    key: "doctors",
    label: "Doctors",
  },
  {
    key: "appointments",
    label: "Appointments",
  },
  {
    key: "departments",
    label: "Departments",
  },
  {
    key: "packages",
    label: "Packages",
  },
];

/* --- SEARCHABLE FIELDS ----------- */

export const SEARCH_FIELDS = {
  doctors: ["name", "specialty", "location"],
  blogs: ["title", "author", "category"],
  departments: ["name", "slug"],
  packages: ["name"],
};

/* --- DEFAULT FILTERS ----------- */

export const DEFAULT_APPOINTMENT_FILTER = {
  status: "",
  search: "",
};

/* --- DATE FORMAT ----------- */

export const DATE_FORMAT = "YYYY-MM-DD";
