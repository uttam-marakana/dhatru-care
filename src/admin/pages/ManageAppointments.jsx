import { useEffect, useState } from "react";

import {
  subscribeAppointments,
  updateAppointmentStatus,
} from "../../api/appointmentsApi";

import AppointmentsTable from "../components/tables/AppointmentsTable"

// import AppointmentsTable from "../components/tables/AppointmentsTable";
import AdminHeader from "../components/layout/AdminHeader";

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const unsub = subscribeAppointments(setAppointments);
    return () => unsub();
  }, []);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Appointments"
        description="Manage hospital appointments"
      />

      <AppointmentsTable
        appointments={appointments}
        onStatusChange={updateAppointmentStatus}
      />
    </div>
  );
}
