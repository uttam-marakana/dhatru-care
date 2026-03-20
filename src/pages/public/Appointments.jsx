import { useSearchParams } from "react-router-dom";

import AppointmentForm from "../../components/forms/AppointmentForm";
import Container from "../../components/layout/Container";

export default function Appointments() {
  const [params] = useSearchParams();

  const packageId = params.get("package");

  return (
    <section
      className="
        min-h-screen
        py-20 md:py-24
        bg-[var(--section)]
      "
    >
      <Container className="container-system">
        {/* --- PAGE HEADER ----------- */}

        <div
          className="
            max-w-3xl
            mx-auto
            text-center
            mb-10 md:mb-14
            animate-fade-in-up
          "
        >
          <h1
            className="
              text-3xl md:text-4xl lg:text-5xl
              font-bold
              gradient-heading
            "
          >
            Book an Appointment
          </h1>

          <p
            className="
              mt-3
              text-sm md:text-base
              text-[var(--text-secondary)]
            "
          >
            Select department, doctor, date and time to schedule your visit.
          </p>
        </div>

        {/* --- APPOINTMENT CARD ----------- */}

        <div
          className="
            max-w-4xl
            mx-auto
            bg-[var(--card)]
            border border-[var(--border)]
            rounded-2xl
            p-6 md:p-8 lg:p-10
            shadow-lg
            hover-lift
            animate-fade-in-up
          "
        >
          <AppointmentForm selectedPackage={packageId} />
        </div>
      </Container>
    </section>
  );
}
