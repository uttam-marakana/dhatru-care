import { Routes, Route, Navigate } from "react-router-dom";

/* layouts */
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

/* guards */
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

/* public pages */
import Home from "../pages/Home";
import Search from "../pages/Search";
import Departments from "../pages/Departments";
import DepartmentDetail from "../pages/DepartmentDetail";
import Doctors from "../pages/Doctors";
import DoctorDetail from "../pages/DoctorDetail";
import Packages from "../pages/Packages";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import Appointments from "../pages/Appointments";


/* auth pages */
import Login from "../auth/Login";
import Signup from "../auth/Signup";

/* protected pages */
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import UserAppointments from "../pages/UserAppointments";

/* admin pages */
import UploadData from "../admin/pages/DataUpload";
import BulkUpload from "../admin/pages/BulkUpload";

import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ------ PUBLIC -------------------------- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />

        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/:slug" element={<DepartmentDetail />} />

        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />

        <Route path="/packages" element={<Packages />} />
        <Route path="/services" element={<Services />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/appointment" element={<Appointments />} />
      </Route>

      {/* ------ AUTH -------------------------- */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* ------ USER PROTECTED -------------------------- */}
      <Route
        element={
          <ProtectedRoute>
            <PublicLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />

        {/* User Appointment Dashboard */}
        <Route path="profile/appointments" element={<UserAppointments />} />
      </Route>

      {/* ------ ADMIN -------------------------- */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to="upload" />} />
        <Route path="upload" element={<UploadData />} />
        <Route path="bulk-upload" element={<BulkUpload />} />
      </Route>

      {/* ------ 404 -------------------------- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
