import { lazy } from "react";
import { FaCalendarCheck, FaPhoneAlt } from "react-icons/fa";

// Dynamic imports for code splitting
const Container = lazy(() => import("../../components/layout/Container"));
const Button = lazy(() => import("../../components/common/Button"));

export default function AppointmentCTA({
  variant = "default", // 'default' | 'large' | 'compact'
  className = "",
}) {
  const isLarge = variant === "large";
  const isCompact = variant === "compact";

  return (
    <section
      className={`
        bg-linear-to-r from-primary to-primary-dark text-white
        py-12 md:py-16 lg:py-20
        ${isLarge ? "my-12 md:my-20 rounded-3xl shadow-2xl mx-4 md:mx-8 lg:mx-auto max-w-6xl" : ""}
        ${className}
      `}
    >
      <Container className={isLarge ? "text-center" : ""}>
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-8 ${isCompact ? "text-center" : ""}`}
        >
          <div className={`${isCompact ? "mb-6" : ""}`}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Ready to Book Your Appointment?
            </h2>
            <p className="text-base md:text-lg opacity-90 max-w-2xl">
              {isCompact
                ? "Get in touch with our team today"
                : "Schedule your consultation with one of our expert specialists – same-day slots available in many cases"}
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 ${isCompact ? "justify-center" : ""}`}
          >
            <Button
              size={isLarge ? "lg" : "md"}
              leftIcon={<FaCalendarCheck />}
              className="bg-white text-primary hover:bg-gray-100 shadow-lg min-w-55"
            >
              Book Appointment
            </Button>

            <Button
              variant="outline"
              size={isLarge ? "lg" : "md"}
              leftIcon={<FaPhoneAlt />}
              className="border-white text-white hover:bg-white/10 min-w-55"
            >
              Call Now: +91 98765 43210
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
