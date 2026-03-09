/* PUBLIC PAGES */

import Home from "../pages/Home";
import Search from "../pages/Search";
import Departments from "../pages/Departments";
import DepartmentDetail from "../pages/DepartmentDetail";
import Doctors from "../pages/Doctors";
import DoctorDetail from "../pages/DoctorDetail";
import Packages from "../pages/Packages";
import PackagesCompare from "../pages/PackagesCompare";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import Appointments from "../pages/Appointments";

/* AUTH */

import Login from "../auth/Login";
import Signup from "../auth/Signup";

/* USER */

import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import UserAppointments from "../pages/UserAppointments";

/* ADMIN */

import UploadData from "../admin/pages/DataUpload";
import BulkUpload from "../admin/pages/BulkUpload";
import ManageAppointments from "../admin/pages/ManageAppointment";

export const publicRoutes = [
  { path: "/", element: Home },
  { path: "/search", element: Search },

  { path: "/departments", element: Departments },
  { path: "/departments/:slug", element: DepartmentDetail },

  { path: "/doctors", element: Doctors },
  { path: "/doctors/:id", element: DoctorDetail },

  { path: "/packages", element: Packages },
  { path: "/packages/compare", element: PackagesCompare },

  { path: "/services", element: Services },

  { path: "/blog", element: Blog },
  { path: "/blog/:slug", element: BlogDetail },

  { path: "/contact", element: Contact },

  { path: "/appointment", element: Appointments },
];

export const authRoutes = [
  { path: "/login", element: Login },
  { path: "/signup", element: Signup },
];

export const userRoutes = [
  { path: "/profile", element: Profile },
  { path: "/settings", element: Settings },
  { path: "/profile/appointments", element: UserAppointments },
];

export const adminRoutes = [
  { path: "upload", element: UploadData },
  { path: "bulk-upload", element: BulkUpload },
  { path: "appointment", element: ManageAppointments },
];
