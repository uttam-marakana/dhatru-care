import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (!tenantId) return;

    const unsub = subscribeAppointments(tenantId, setAppointments);
    return () => unsub();
  }, [tenantId]);

  const pending = appointments.filter((a) => a.status === "pending").length;
  const confirmed = appointments.filter((a) => a.status === "confirmed").length;
  const completed = appointments.filter((a) => a.status === "completed").length;
  const rejected = appointments.filter((a) => a.status === "rejected").length;

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Admin Dashboard"
        description="Overview of hospital system metrics"
      />

      {/* MAIN METRICS */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
        "
      >
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

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
        "
      >
        <DashboardCard
          title="Pending"
          value={pending}
          icon={<FaClock />}
          color="#f59e0b"
        />

        <DashboardCard
          title="Confirmed"
          value={confirmed}
          icon={<FaCheckCircle />}
          color="#10b981"
        />

        <DashboardCard
          title="Rejected"
          value={rejected}
          icon={<FaTimesCircle />}
          color="#ef4444"
        />
      </div>
    </div>
  );
}
