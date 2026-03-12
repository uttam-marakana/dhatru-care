import { useEffect, useState } from "react";

import { subscribeAppointments } from "../../api/appointmentsApi";
import { getDoctors } from "../../api/doctorsApi";
import { getDepartments } from "../../api/departmentsApi";
import { getPackages } from "../../api/packagesApi";

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [packages, setPackages] = useState([]);
  const [appointments, setAppointments] = useState([]);

  /* LOAD STATIC DATA */

  useEffect(() => {
    const load = async () => {
      const doctorsData = await getDoctors();
      const departmentsData = await getDepartments();
      const packagesData = await getPackages();

      setDoctors(doctorsData);
      setDepartments(departmentsData);
      setPackages(packagesData);
    };

    load();
  }, []);

  /* REALTIME APPOINTMENTS */

  useEffect(() => {
    const unsub = subscribeAppointments(setAppointments);
    return () => unsub();
  }, []);

  /* ANALYTICS */

  const totalDoctors = doctors.length;
  const totalDepartments = departments.length;
  const totalPackages = packages.length;
  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (a) => a.status === "pending",
  ).length;

  const approvedAppointments = appointments.filter(
    (a) => a.status === "approved",
  ).length;

  const rejectedAppointments = appointments.filter(
    (a) => a.status === "rejected",
  ).length;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* MAIN METRICS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-5 rounded">
          <p className="text-sm text-gray-600">Doctors</p>
          <p className="text-2xl font-bold">{totalDoctors}</p>
        </div>

        <div className="bg-purple-100 p-5 rounded">
          <p className="text-sm text-gray-600">Departments</p>
          <p className="text-2xl font-bold">{totalDepartments}</p>
        </div>

        <div className="bg-indigo-100 p-5 rounded">
          <p className="text-sm text-gray-600">Packages</p>
          <p className="text-2xl font-bold">{totalPackages}</p>
        </div>

        <div className="bg-gray-100 p-5 rounded">
          <p className="text-sm text-gray-600">Appointments</p>
          <p className="text-2xl font-bold">{totalAppointments}</p>
        </div>
      </div>

      {/* APPOINTMENT STATUS */}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-yellow-100 p-5 rounded">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold">{pendingAppointments}</p>
        </div>

        <div className="bg-green-100 p-5 rounded">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-2xl font-bold">{approvedAppointments}</p>
        </div>

        <div className="bg-red-100 p-5 rounded">
          <p className="text-sm text-gray-600">Rejected</p>
          <p className="text-2xl font-bold">{rejectedAppointments}</p>
        </div>
      </div>

      {/* RECENT APPOINTMENTS */}

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Recent Appointments</h2>

        <div className="border rounded divide-y">
          {appointments.slice(0, 5).map((a) => (
            <div key={a.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{a.patientName}</p>
                <p className="text-sm text-gray-500">
                  {a.date} — {a.time}
                </p>
              </div>

              <span className="text-sm capitalize">{a.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
