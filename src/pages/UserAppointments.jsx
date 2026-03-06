import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { subscribeUserAppointments } from "../api/appointmentsApi";

export default function UserAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeAppointments;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAppointments([]);
        setLoading(false);
        return;
      }

      unsubscribeAppointments = subscribeUserAppointments(user.uid, (data) => {
        setAppointments(data);
        setLoading(false);
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeAppointments) unsubscribeAppointments();
    };
  }, []);

  if (loading) {
    return <div className="p-6">Loading appointments...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">My Appointments</h1>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((a) => (
          <div key={a.id} className="border rounded p-4">
            <p>
              <strong>Patient Name:</strong> {a.patientName}
            </p>
            <p>
              <strong>Date:</strong> {a.date}
            </p>

            <p>
              <strong>Time:</strong> {a.time}
            </p>

            <p>
              <strong>Department:</strong> {a.department}
            </p>

            <p>
              <strong>Status:</strong> {a.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
