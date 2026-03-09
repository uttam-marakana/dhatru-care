import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

import LazyWrapper from "../components/common/LazyWrapper";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import NotFound from "../pages/NotFound";

/* AUTO ROUTES */

import { autoRoutes } from "./autoRoutes";

/* DYNAMIC ROUTES */

const DepartmentDetail = lazy(() => import("../pages/DepartmentDetail"));
const DoctorDetail = lazy(() => import("../pages/DoctorDetail"));
const BlogDetail = lazy(() => import("../pages/BlogDetail"));

/* AUTH */

const Login = lazy(() => import("../auth/Login"));
const Signup = lazy(() => import("../auth/Signup"));

/* USER */

const Profile = lazy(() => import("../pages/Profile"));
const Settings = lazy(() => import("../pages/Settings"));
const UserAppointments = lazy(() => import("../pages/UserAppointments"));

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<PublicLayout />}>
        {autoRoutes.map(({ path, element: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <LazyWrapper>
                <Component />
              </LazyWrapper>
            }
          />
        ))}

        {/* DYNAMIC ROUTES */}

        <Route
          path="/departments/:slug"
          element={
            <LazyWrapper>
              <DepartmentDetail />
            </LazyWrapper>
          }
        />

        <Route
          path="/doctors/:id"
          element={
            <LazyWrapper>
              <DoctorDetail />
            </LazyWrapper>
          }
        />

        <Route
          path="/blog/:slug"
          element={
            <LazyWrapper>
              <BlogDetail />
            </LazyWrapper>
          }
        />
      </Route>

      {/* AUTH */}

      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <LazyWrapper>
              <Login />
            </LazyWrapper>
          }
        />

        <Route
          path="/signup"
          element={
            <LazyWrapper>
              <Signup />
            </LazyWrapper>
          }
        />
      </Route>

      {/* USER */}

      <Route
        element={
          <ProtectedRoute>
            <PublicLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/profile"
          element={
            <LazyWrapper>
              <Profile />
            </LazyWrapper>
          }
        />

        <Route
          path="/settings"
          element={
            <LazyWrapper>
              <Settings />
            </LazyWrapper>
          }
        />

        <Route
          path="/profile/appointments"
          element={
            <LazyWrapper>
              <UserAppointments />
            </LazyWrapper>
          }
        />
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
      </Route>

      {/* 404 */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
