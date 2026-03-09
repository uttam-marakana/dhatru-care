import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import NotFound from "../pages/NotFound";

import {
  publicRoutes,
  authRoutes,
  userRoutes,
  adminRoutes,
} from "./routeConfig";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        {publicRoutes.map(({ path, element: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>

      {/* AUTH ROUTES */}
      <Route element={<AuthLayout />}>
        {authRoutes.map(({ path, element: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>

      {/* USER PROTECTED ROUTES */}
      <Route
        element={
          <ProtectedRoute>
            <PublicLayout />
          </ProtectedRoute>
        }
      >
        {userRoutes.map(({ path, element: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to="upload" />} />

        {adminRoutes.map(({ path, element: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
