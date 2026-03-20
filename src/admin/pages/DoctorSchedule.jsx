import { useEffect, useState } from "react";

import { getDoctors } from "../../api/doctorsApi";

import DoctorScheduleForm from "../components/forms/DoctorScheduleForm";
import AdminHeader from "../components/layout/AdminHeader";

export default function DoctorSchedule() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await getDoctors();
      setDoctors(data);
    };

    load();
  }, []);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Doctor Schedule"
        description="Manage doctor availability and appointment slots"
      />

      {/* --- SELECT DOCTOR ----------- */}

      <div className="glass p-6 max-w-lg">
        <label className="block mb-2 font-medium">Select Doctor</label>

        <select
          value={selectedDoctor?.id || ""}
          onChange={(e) =>
            setSelectedDoctor(doctors.find((d) => d.id === e.target.value))
          }
          className="
            w-full p-3 rounded-lg
            border border-[var(--border)]
            bg-[var(--card)]
          "
        >
          <option value="">Choose doctor</option>

          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* --- SCHEDULE FORM ----------- */}

      {selectedDoctor && <DoctorScheduleForm doctor={selectedDoctor} />}
    </div>
  );
}
