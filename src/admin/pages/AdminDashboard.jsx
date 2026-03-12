import { useEffect, useState } from "react";

import { subscribeAppointments } from "../../api/appointmentsApi";
import { getDoctors } from "../../api/doctorsApi";
import { getAllDepartments } from "../../api/departmentsApi";
import { getPackages } from "../../api/packagesApi";

import DashboardCard from "../components/cards/DashboardCard";
import AdminHeader from "../components/layout/AdminHeader";

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [packages, setPackages] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const load = async () => {
      setDoctors(await getDoctors());
      setDepartments(await getAllDepartments());
      setPackages(await getPackages());
    };

    load();
  }, []);

  useEffect(() => {
    const unsub = subscribeAppointments(setAppointments);
    return () => unsub();
  }, []);

  const pending = appointments.filter((a) => a.status === "pending").length;
  const approved = appointments.filter((a) => a.status === "approved").length;
  const rejected = appointments.filter((a) => a.status === "rejected").length;

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Admin Dashboard"
        description="Overview of hospital system metrics"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <DashboardCard title="Doctors" value={doctors.length} />

        <DashboardCard title="Departments" value={departments.length} />

        <DashboardCard title="Packages" value={packages.length} />

        <DashboardCard title="Appointments" value={appointments.length} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <DashboardCard title="Pending" value={pending} />

        <DashboardCard title="Approved" value={approved} />

        <DashboardCard title="Rejected" value={rejected} />
      </div>
    </div>
  );
}
