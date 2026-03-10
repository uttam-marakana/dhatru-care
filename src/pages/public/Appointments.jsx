import AppointmentForm from "../../components/forms/AppointmentForm";
import Container from "../../components/layout/Container";

export default function Appointments() {
  return (
    <section
      className="
      min-h-screen py-24
      bg-gradient-to-b
      from-gray-50 via-gray-100 to-gray-50
      dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
      "
    >
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Book an Appointment
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Fill out the form below to schedule your visit.
          </p>
        </div>

        <div
          className="
          max-w-2xl mx-auto
          bg-white dark:bg-white/5
          backdrop-blur-md
          border border-gray-200 dark:border-white/10
          rounded-2xl
          p-8
          shadow-[0_0_40px_rgba(59,130,246,0.18)]
          "
        >
          <AppointmentForm />
        </div>
      </Container>
    </section>
  );
}
