import Container from "../components/layout/Container";
import AppointmentForm from "../components/forms/AppointmentForm";

export default function Appointments() {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Book an Appointment
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Fill out the form below and our team will contact you shortly.
          </p>
        </div>

        <AppointmentForm />
      </Container>
    </section>
  );
}
