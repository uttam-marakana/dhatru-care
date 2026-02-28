import { Routes, Route } from "react-router-dom";

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
import UploadData from "../admin/pages/DataUpload";
import AdminRoute from "../admin/AdminRoute";
import AdminLayout from "../admin/layout/AdminLayout";

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
        <Route path="upload" element={<UploadData />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
