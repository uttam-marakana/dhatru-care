import { Link } from "react-router-dom";
import { FaCalendarCheck } from "react-icons/fa";

export default function FloatingAppointmentButton() {
  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 group flex items-center">
      {/* --- Hover Bubble (mobile & tablet) ----------- */}
      <span
        className="
          absolute right-16 top-1/2 -translate-y-1/2
          px-3 py-1.5
          text-sm font-medium
          whitespace-nowrap
          bg-white dark:bg-white/5
          backdrop-blur-md
          border border-gray-200 dark:border-white/10
          rounded-xl
          text-gray-900 dark:text-white
          opacity-0 translate-x-2
          group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-300
          shadow-lg shadow-blue-500/20
          lg:hidden
        "
      >
        Book Appointment
      </span>

      {/* --- Floating Button ----------- */}
      <Link
        to="/appointments"
        className="
          flex items-center justify-center gap-2
          text-white
          bg-blue-500   
          backdrop-blur-md
          shadow-[0_0_40px_rgba(59,130,246,0.25)]
          transition-all duration-300
          w-14 h-14
          rounded-full
          lg:w-auto lg:h-auto
          lg:px-5 lg:py-3
          lg:rounded-full
          lg:bg-white lg:dark:bg-white/5
          lg:text-gray-900 lg:dark:text-white
          lg:border lg:border-gray-200 lg:dark:border-white/10
          lg:backdrop-blur-md
        "
      >
        <FaCalendarCheck className="text-lg" />

        {/* --- Desktop Label ----------- */}
        <span className="hidden lg:inline font-medium">Book Appointment</span>
      </Link>
    </div>
  );
}
