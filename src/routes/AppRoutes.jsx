import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import Home from "../pages/Home";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import UploadData from "../admin/pages/DataUpload";
import BulkUpload from "../admin/pages/BulkUpload";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <PublicLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

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

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
