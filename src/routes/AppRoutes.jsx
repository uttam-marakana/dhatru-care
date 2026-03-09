import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

import LazyWrapper from "../components/common/LazyWrapper";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import { publicRoutes } from "./autoRoutes";

/* DYNAMIC PUBLIC ROUTES */

const DepartmentDetail = lazy(() => import("../pages/public/DepartmentDetail"));

const DoctorDetail = lazy(() => import("../pages/public/DoctorDetail"));

const BlogDetail = lazy(() => import("../pages/public/BlogDetail"));

/* AUTH */

const Login = lazy(() => import("../auth/Login"));
const Signup = lazy(() => import("../auth/Signup"));

/* PROTECTED */

const Profile = lazy(() => import("../pages/protected/Profile"));
const Settings = lazy(() => import("../pages/protected/Settings"));

const UserAppointments = lazy(
  () => import("../pages/protected/UserAppointments"),
);

/* ADMIN */

const DataUpload = lazy(() => import("../admin/pages/DataUpload"));

const BulkUpload = lazy(() => import("../admin/pages/BulkUpload"));

const ManageAppointment = lazy(
  () => import("../admin/pages/ManageAppointment"),
);

const NotFound = lazy(() => import("../pages/public/NotFound"));

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}

      <Route element={<PublicLayout />}>
        {publicRoutes.map(({ path, element: Component }) => (
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

      {/* AUTH ROUTES */}

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

      {/* PROTECTED ROUTES */}

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

      {/* ADMIN ROUTES */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route
          path="upload"
          element={
            <LazyWrapper>
              <DataUpload />
            </LazyWrapper>
          }
        />

        <Route
          path="bulk-upload"
          element={
            <LazyWrapper>
              <BulkUpload />
            </LazyWrapper>
          }
        />

        <Route
          path="appointment"
          element={
            <LazyWrapper>
              <ManageAppointment />
            </LazyWrapper>
          }
        />
      </Route>

      {/* 404 */}

      <Route
        path="*"
        element={
          <LazyWrapper>
            <NotFound />
          </LazyWrapper>
        }
      />
    </Routes>
  );
}
