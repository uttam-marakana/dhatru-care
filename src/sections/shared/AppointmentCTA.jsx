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
      className={`bg-linear-to-r from-primary to-primary-dark text-white py-12 md:py-16 lg:py-20
      ${isLarge ? "my-12 md:my-20 rounded-3xl shadow-2xl mx-4 md:mx-8 lg:mx-auto max-w-6xl" : ""}
      ${className}`}
    >
      <Container className="text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Ready to Book Your Appointment?
        </h2>

        <p className="mb-8 opacity-90">
          Schedule your consultation with our expert specialists.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/appointments">
            <Button
              size="lg"
              leftIcon={<FaCalendarCheck />}
              className="min-w-48"
            >
              Book Appointment
            </Button>
          </Link>

          <a href="tel:+919876543210">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<FaPhoneAlt />}
              className="border-white text-white min-w-48"
            >
              Call Now
            </Button>
          </a>
        </div>
      </Container>
    </section>
  );
}
