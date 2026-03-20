import { useEffect, useState, useMemo } from "react";

import { subscribeAppointments } from "../../api/appointmentsApi";
import { getDoctors } from "../../api/doctorsApi";
import { getAllDepartments } from "../../api/departmentsApi";
import { getPackages } from "../../api/packagesApi";
import { useAuth } from "../../context/AuthContext";

import DashboardCard from "../components/cards/DashboardCard";
import AdminHeader from "../components/layout/AdminHeader";

import {
  FaUserMd,
  FaHospital,
  FaBoxOpen,
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [packages, setPackages] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  const { tenantId } = useAuth();

  /* ================= LOAD STATIC DATA ================= */

  useEffect(() => {
    const load = async () => {
      const doctorsData = await getDoctors();
      const departmentsData = await getAllDepartments();
      const packagesData = await getPackages();

      setDoctors(doctorsData);
      setDepartments(departmentsData);
      setPackages(packagesData);

      setLoading(false);
    };

    load();
  }, []);

  /* ================= APPOINTMENTS ================= */

  useEffect(() => {
    if (!tenantId) {
      console.warn("No tenantId found");
      return;
    }

    console.log("Subscribing to tenant:", tenantId);

    const unsub = subscribeAppointments(tenantId, (data) => {
      console.log("Appointments received:", data);
      setAppointments(data);
    });

    return () => unsub();
  }, [tenantId]);

  /* ================= NORMALIZED STATS ================= */

  const stats = useMemo(() => {
    const normalize = (s) => (s || "pending").toLowerCase().trim();

    return {
      pending: appointments.filter((a) => normalize(a.status) === "pending")
        .length,
      confirmed: appointments.filter((a) => normalize(a.status) === "confirmed")
        .length,
      completed: appointments.filter((a) => normalize(a.status) === "completed")
        .length,
      rejected: appointments.filter((a) => normalize(a.status) === "rejected")
        .length,
      cancelled: appointments.filter((a) => normalize(a.status) === "cancelled")
        .length,
    };
  }, [appointments]);

  /* ================= UI ================= */

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Admin Dashboard"
        description="Overview of hospital system metrics"
      />

      {/* MAIN METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Doctors"
          value={loading ? "..." : doctors.length}
          icon={<FaUserMd />}
          color="#3b82f6"
        />

        <DashboardCard
          title="Departments"
          value={loading ? "..." : departments.length}
          icon={<FaHospital />}
          color="#10b981"
        />

        <DashboardCard
          title="Packages"
          value={loading ? "..." : packages.length}
          icon={<FaBoxOpen />}
          color="#f59e0b"
        />

        <DashboardCard
          title="Appointments"
          value={appointments.length}
          icon={<FaCalendarCheck />}
          color="#6366f1"
        />
      </div>

      {/* STATUS METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <DashboardCard
          title="Pending"
          value={stats.pending}
          icon={<FaClock />}
        />

        <DashboardCard
          title="Confirmed"
          value={stats.confirmed}
          icon={<FaCheckCircle />}
        />

        <DashboardCard
          title="Completed"
          value={stats.completed}
          icon={<FaCheckCircle />}
        />

        <DashboardCard
          title="Rejected"
          value={stats.rejected}
          icon={<FaTimesCircle />}
        />

        <DashboardCard
          title="Cancelled"
          value={stats.cancelled}
          icon={<FaTimesCircle />}
        />
      </div>
    </div>
  );
}
