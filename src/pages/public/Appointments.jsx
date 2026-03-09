import Container from "../../components/layout/Container";
import AppointmentForm from "../../components/forms/AppointmentForm";

export default function Appointments() {
  return (
    <section
      className="
      min-h-screen
      bg-[var(--bg)]
      py-16
      "
    >
      <Container>
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1
            className="
            text-4xl font-bold
            text-[var(--text)]
            "
          >
            Book an Appointment
          </h1>

          <p
            className="
            text-[var(--text-secondary)]
            mt-4
            "
          >
            Fill out the form below and our team will contact you shortly.
          </p>
        </div>

        <AppointmentForm />
      </Container>
    </section>
  );
}
