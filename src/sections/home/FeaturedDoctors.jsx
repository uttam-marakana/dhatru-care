import { lazy } from "react";
import { Link } from "react-router-dom";

const Container = lazy(() => import("../../components/layout/Container"));
const Button = lazy(() => import("../../components/common/Button"));

export default function FeaturedDoctors({ doctors = [], loading }) {
  if (loading)
    return (
      <div className="text-center py-20 text-[var(--text-secondary)] bg-[var(--bg)]">
        Loading doctors...
      </div>
    );

  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg)] text-[var(--text)] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-162.5 h-162.5 bg-(--glow-bg) blur-[140px] rounded-full"></div>

      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
            Meet Our Expert Doctors
          </h2>

          <p className="mt-5 text-[var(--text-secondary)] max-w-2xl mx-auto">
            Experienced specialists delivering personalized care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.slice(0, 4).map((doctor) => (
            <Link
              key={doctor.id}
              to={`/doctors/${doctor.id}`}
              className="group bg-[var(--card)] border border-[var(--border)]
              rounded-2xl overflow-hidden transition
              hover:-translate-y-2 hover:border-[var(--color-primary)]/40
              hover:shadow-[0_0_40px_var(--glow-soft)]"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={doctor.image || "/doctor-placeholder.jpg"}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="font-semibold text-lg">{doctor.name}</h3>

                <p className="text-[var(--color-primary)] mb-5">
                  {doctor.specialty}
                </p>

                <Button size="sm" className="w-full">
                  Book Consultation
                </Button>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link to="/doctors">
            <Button variant="ghost" size="lg">
              View All Doctors →
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
