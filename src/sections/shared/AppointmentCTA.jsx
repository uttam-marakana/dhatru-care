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
      bg-(--bg)
      text-(--text)
      py-20 md:py-24
      ${
        isLarge
          ? "my-16 md:my-24 rounded-3xl border border-(--border) shadow-[0_0_60px_var(--glow-soft)] mx-4 md:mx-8 lg:mx-auto max-w-6xl"
          : ""
      }
      ${className}
      `}
    >
      {/* Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-175 bg-(--glow-bg) blur-[140px] rounded-full"></div>

      <Container className="relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-main">
          Ready to Prioritize Your Health?
        </h2>

        <p className="text-lg md:text-xl text-(--text-secondary) max-w-2xl mx-auto mb-12">
          Book your consultation today and receive expert care from experienced
          specialists in a safe, modern environment.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/appointment">
            <Button
              size="lg"
              leftIcon={<FaCalendarCheck />}
              className="min-w-55 bg-(--color-main) hover:bg-(--color-main-hover) text-white shadow-lg"
            >
              Book Appointment
            </Button>
          </Link>

          <a href="tel:+919876543210">
            <Button
              variant="ghost"
              size="lg"
              leftIcon={<FaPhoneAlt />}
              className="min-w-55 border border-(--border) text-main hover:bg-(--color-main)"
            >
              Call Now
            </Button>
          </a>
        </div>

        <div className="mt-12 text-sm text-(--text-secondary) flex flex-wrap justify-center gap-4">
          <span className="flex items-center gap-2">
            <span className="text-main">✔</span>
            24×7 Emergency Support
          </span>

          <span className="flex items-center gap-2">
            <span className="text-main">✔</span>
            Experienced Specialists
          </span>

          <span className="flex items-center gap-2">
            <span className="text-main">✔</span>
            Advanced Infrastructure
          </span>
        </div>
      </Container>
    </section>
  );
}
