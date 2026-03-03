import { lazy } from "react";
import { Link } from "react-router-dom";

const Container = lazy(() => import("../../components/layout/Container"));
const Button = lazy(() => import("../../components/common/Button"));

export default function FeaturedDoctors({ doctors = [], loading }) {
  if (loading)
    return (
      <div className="text-center py-20 text-gray-400 bg-gray-950">
        Loading doctors...
      </div>
    );

  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Same Blue Glow Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-blue-600/20 blur-[140px] rounded-full"></div>

      <Container>
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            Meet Our Expert Doctors
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            Experienced specialists dedicated to delivering personalized,
            high-quality healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {doctors.slice(0, 4).map((doctor) => (
            <Link
              key={doctor.id}
              to={`/doctors/${doctor.id}`}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]"
            >
              {/* Subtle Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Doctor Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={doctor.image || "/doctor-placeholder.jpg"}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

                {/* Experience Badge */}
                {doctor.experience && (
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-lg shadow-blue-500/30">
                    {doctor.experience}+ Years
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-1">{doctor.name}</h3>

                <p className="text-blue-400 font-medium mb-5">
                  {doctor.specialty}
                </p>

                <Button
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                >
                  Book Consultation
                </Button>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-14 relative z-10">
          <Link to="/doctors">
            <Button
              variant="ghost"
              size="lg"
              className="text-blue-400 hover:text-white"
            >
              View All Doctors
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
