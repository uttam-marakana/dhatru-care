import { Link } from "react-router-dom";
import { FaCalendarCheck } from "react-icons/fa";

export default function FloatingAppointmentButton() {
  return (
    <Link
      to="/appointments"
      className="
      fixed bottom-6 right-6 z-50
      flex items-center gap-2
      bg-blue-500 hover:bg-blue-600
      text-white
      px-5 py-3
      rounded-full
      shadow-lg shadow-blue-500/30
      transition
      "
    >
      <FaCalendarCheck />
      Book Appointment
    </Link>
  );
}
