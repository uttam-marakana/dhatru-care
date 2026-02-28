import { Routes, Route, Navigate } from "react-router-dom";

// Public pages
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
import NotFound from "../pages/NotFound";

// Auth
import Login from "../auth/Login";
import Signup from "../auth/Signup";

// Admin
import AdminLayout from "../admin/layout/AdminLayout";
import UploadData from "../admin/pages/DataUpload";
import BulkUpload from "../admin/pages/BulkUpload";
import AdminRoute from "../admin/AdminRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
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

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ADMIN (PROTECTED) */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        {/* default admin route */}
        <Route index element={<Navigate to="upload" replace />} />

        <Route path="upload" element={<UploadData />} />
        <Route path="bulk-upload" element={<BulkUpload />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
