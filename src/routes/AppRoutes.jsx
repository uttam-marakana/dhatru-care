import { Routes, Route, Navigate } from "react-router-dom";

/* layouts */
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

/* guards */
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

/* pages */
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
      {/* PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* AUTH */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* USER PROTECTED */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <PublicLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Profile />} />
      </Route>

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <PublicLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Settings />} />
      </Route>

      {/* ADMIN */}
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

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
