import { lazy } from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaPhoneAlt } from "react-icons/fa";

const Container = lazy(() => import("../../components/layout/Container"));
const Button = lazy(() => import("../../components/common/Button"));

export default function AppointmentCTA({
  variant = "default",
  className = "",
}) {
  const isLarge = variant === "large";

  return (
    <section
      className={`
        relative overflow-hidden
        bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950
        text-white
        py-20 md:py-24
        ${
          isLarge
            ? "my-16 md:my-24 rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(59,130,246,0.15)] mx-4 md:mx-8 lg:mx-auto max-w-6xl"
            : ""
        }
        ${className}
      `}
    >
      {/* Blue Glow Aura */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/20 blur-[140px] rounded-full"></div>

      <Container className="relative z-10 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
          Ready to Prioritize Your Health?
        </h2>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Book your consultation today and receive expert care from experienced
          specialists in a safe, modern environment.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/appointments">
            <Button
              size="lg"
              leftIcon={<FaCalendarCheck />}
              className="min-w-[220px] bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30"
            >
              Book Appointment
            </Button>
          </Link>

          <a href="tel:+919876543210">
            <Button
              variant="ghost"
              size="lg"
              leftIcon={<FaPhoneAlt />}
              className="min-w-[220px] border border-blue-400/40 text-blue-400 hover:bg-blue-600 hover:text-white transition"
            >
              Call Now
            </Button>
          </a>
        </div>

        {/* Trust Microcopy */}
        <div className="mt-12 text-sm text-gray-400 flex flex-wrap justify-center gap-4">
          <span className="flex items-center gap-2">
            <span className="text-blue-400">✔</span>
            24×7 Emergency Support
          </span>
          <span className="flex items-center gap-2">
            <span className="text-blue-400">✔</span>
            Experienced Specialists
          </span>
          <span className="flex items-center gap-2">
            <span className="text-blue-400">✔</span>
            Advanced Infrastructure
          </span>
        </div>
      </Container>
    </section>
  );
}
