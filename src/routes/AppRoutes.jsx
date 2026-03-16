import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

import LazyWrapper from "../components/common/LazyWrapper";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import { publicRoutes } from "./autoRoutes";

/* ---------------- PUBLIC DYNAMIC ROUTES ---------------- */

const DepartmentDetail = lazy(() => import("../pages/public/DepartmentDetail"));
const DoctorDetail = lazy(() => import("../pages/public/DoctorDetail"));
const BlogDetail = lazy(() => import("../pages/public/BlogDetail"));
const Appointments = lazy(() => import("../pages/public/Appointments"));
const PackagesCompare = lazy(() => import("../pages/public/PackagesCompare"));

/* ---------------- AUTH ---------------- */

const Login = lazy(() => import("../auth/Login"));
const Signup = lazy(() => import("../auth/Signup"));

/* ---------------- PROTECTED USER ---------------- */

const Profile = lazy(() => import("../pages/protected/Profile"));
const Settings = lazy(() => import("../pages/protected/Settings"));
const UserAppointments = lazy(
  () => import("../pages/protected/UserAppointments"),
);

/* ---------------- ADMIN ---------------- */

const AdminDashboard = lazy(() => import("../admin/pages/AdminDashboard"));
const ManageDoctors = lazy(() => import("../admin/pages/ManageDoctors"));
const DoctorSchedule = lazy(() => import("../admin/pages/DoctorSchedule"));
const ManageAppointments = lazy(
  () => import("../admin/pages/ManageAppointments"),
);
const ManageBlogs = lazy(() => import("../admin/pages/ManageBlogs"));
const ManageDepartments = lazy(
  () => import("../admin/pages/ManageDepartments"),
);
const ManagePackages = lazy(() => import("../admin/pages/ManagePackages"));
const DataUpload = lazy(() => import("../admin/pages/DataUpload"));
const BulkUpload = lazy(() => import("../admin/pages/BulkUpload"));

/* ---------------- 404 ---------------- */

const NotFound = lazy(() => import("../pages/public/NotFound"));

export default function AppRoutes() {
  return (
    <Routes>
      {/* ---------------- PUBLIC ROUTES ---------------- */}

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

        {/* APPOINTMENT PAGE */}

        <Route
          path="/appointment"
          element={
            <LazyWrapper>
              <Appointments />
            </LazyWrapper>
          }
        />

        <Route
          path="/packages/compare"
          element={
            <LazyWrapper>
              <PackagesCompare />
            </LazyWrapper>
          }
        />

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

      {/* ---------------- AUTH ROUTES ---------------- */}

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

      {/* ---------------- USER PROTECTED ROUTES ---------------- */}

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

      {/* ---------------- ADMIN ROUTES ---------------- */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route
          index
          element={
            <LazyWrapper>
              <AdminDashboard />
            </LazyWrapper>
          }
        />

        <Route
          path="doctors"
          element={
            <LazyWrapper>
              <ManageDoctors />
            </LazyWrapper>
          }
        />

        <Route
          path="doctors/:doctorId/schedule"
          element={
            <LazyWrapper>
              <DoctorSchedule />
            </LazyWrapper>
          }
        />

        <Route
          path="appointments"
          element={
            <LazyWrapper>
              <ManageAppointments />
            </LazyWrapper>
          }
        />

        <Route
          path="blogs"
          element={
            <LazyWrapper>
              <ManageBlogs />
            </LazyWrapper>
          }
        />

        <Route
          path="departments"
          element={
            <LazyWrapper>
              <ManageDepartments />
            </LazyWrapper>
          }
        />

        <Route
          path="packages"
          element={
            <LazyWrapper>
              <ManagePackages />
            </LazyWrapper>
          }
        />

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
      </Route>

      {/* ---------------- 404 ---------------- */}

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
