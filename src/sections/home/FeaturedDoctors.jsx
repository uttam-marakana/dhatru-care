import { Link } from "react-router-dom";

import Container from "../../components/layout/Container";
import Button from "../../components/common/Button";

export default function FeaturedDoctors({ doctors = [], loading }) {
  if (loading)
    return (
      <div className="text-center py-20 text-[var(--text-secondary)] bg-[var(--section)]">
        Loading doctors...
      </div>
    );

  return (
    <section className="relative py-20 md:py-24 bg-[var(--section)] text-[var(--text)] overflow-hidden">
      {/* --- Background Glow ----------- */}
      <div
        className="
          pointer-events-none
          absolute -top-40 left-1/2 -translate-x-1/2
          w-[700px] md:w-[900px]
          h-[700px] md:h-[900px]
          bg-[var(--glow-bg)]
          blur-[140px]
          rounded-full
          opacity-70
          z-0
        "
      />

      <Container className="relative z-10">
        {/* --- Header ----------- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
            Meet Our Expert Doctors
          </h2>

          <p className="mt-5 text-[var(--text-secondary)] max-w-2xl mx-auto">
            Experienced specialists delivering personalized care.
          </p>
        </div>

        {/* --- Grid ----------- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.slice(0, 4).map((doctor) => (
            <Link
              key={doctor.id}
              to={`/doctors/${doctor.id}`}
              className="
                group
                bg-[var(--card)]
                border border-[var(--border)]
                rounded-2xl
                overflow-hidden
                transition-all duration-500
                hover:-translate-y-2
                hover:border-[var(--color-primary)]/40
                hover:shadow-[0_0_40px_var(--glow-soft)]
              "
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={doctor.image || "/doctor-placeholder.png"}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="font-semibold text-lg text-[var(--text)]">
                  {doctor.name}
                </h3>

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
