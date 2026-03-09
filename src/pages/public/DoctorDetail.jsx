import { useParams, Link } from "react-router-dom";
import { useState, useEffect, lazy } from "react";
import { getDoctorById, getDoctors } from "../../api/doctorsApi";

import {
  FaCalendarCheck,
  FaPhoneAlt,
  FaGraduationCap,
  FaAward,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

const Container = lazy(() => import("../../components/layout/Container"));
const Button = lazy(() => import("../../components/common/Button"));
const Card = lazy(() => import("../../components/common/Card"));
const AppointmentCTA = lazy(
  () => import("../../sections/shared/AppointmentCTA"),
);
const Breadcrumb = lazy(() => import("../../components/common/Breadcrumb"));

export default function DoctorDetail() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchDoctor = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getDoctorById(id);

        if (!mounted) return;

        if (!data) {
          setError("Doctor not found");
          return;
        }

        setDoctor(data);

        const related = await getDoctors({
          specialty: data.specialty,
        });

        if (!mounted) return;

        setRelatedDoctors(related.filter((d) => d.id !== data.id).slice(0, 4));
      } catch (err) {
        console.error(err);
        if (mounted) setError("Failed to load doctor details");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (id) fetchDoctor();

    return () => (mounted = false);
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] text-[var(--text-secondary)]">
        Loading doctor...
      </div>
    );

  if (error || !doctor)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] text-red-500">
        {error}
      </div>
    );

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Doctors", path: "/doctors" },
          { label: doctor?.name || "Profile" },
        ]}
      />

      {/* HERO */}
      <div className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-175 bg-[var(--glow-bg)] blur-[150px] rounded-full"></div>

        <Container>
          <div className="grid md:grid-cols-3 gap-10 relative z-10">
            {/* PROFILE */}
            <Card
              className="
              p-6 text-center
              bg-[var(--card)]
              border border-[var(--border)]
              shadow-[0_0_40px_var(--glow-soft)
              "
            >
              {doctor.imageUrl ? (
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
              ) : (
                <div className="text-8xl mb-4">🩺</div>
              )}

              <h1 className="text-2xl font-bold text-[var(--color-primary)]">
                {doctor.name}
              </h1>

              <p className="text-[var(--text-secondary)]">{doctor.specialty}</p>

              <div className="flex justify-center gap-4 mt-4 text-sm text-[var(--muted)]">
                <span>{doctor.experience}</span>

                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  {doctor.rating || 4.9}
                </span>
              </div>

              <div className="space-y-3 mt-6">
                <Link to="/appointments">
                  <Button size="lg" leftIcon={<FaCalendarCheck />}>
                    Book Appointment
                  </Button>
                </Link>

                <Button className="mt-3" size="lg" variant="outline">
                  <FaPhoneAlt className="mr-2" />
                  Call Now
                </Button>
              </div>
            </Card>

            {/* DETAILS */}
            <div className="md:col-span-2 space-y-8 text-[var(--text-secondary)]">
              <div>
                <h2 className="text-2xl font-bold text-[var(--text)] mb-2">
                  About
                </h2>
                <p>{doctor.bio}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2 text-[var(--text)]">
                  <FaGraduationCap className="text-[var(--color-primary)]" />
                  Qualification
                </h3>
                <p>{doctor.qualification}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2 text-[var(--text)]">
                  <FaAward className="text-[var(--color-primary)]" />
                  Achievements
                </h3>

                <ul className="space-y-2 mt-2">
                  {(doctor.achievements || []).map((a, i) => (
                    <li key={i}>✔ {a}</li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <p>
                  <FaCalendarCheck className="inline mr-2 text-[var(--color-primary)]" />
                  {doctor.availability}
                </p>

                <p>
                  <FaMapMarkerAlt className="inline mr-2 text-[var(--color-primary)]" />
                  {doctor.location}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* RELATED DOCTORS */}
      {/* RELATED DOCTORS */}
      {relatedDoctors.length > 0 && (
        <section className="relative py-20 md:py-24 bg-[var(--section)] text-[var(--text)] overflow-hidden">
          {/* Background Glow */}
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
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
                Related Specialists
              </h2>

              <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
                Meet other experienced doctors specializing in similar fields.
              </p>
            </div>

            {/* Doctors Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedDoctors.map((doc) => (
                <Link key={doc.id} to={`/doctors/${doc.id}`}>
                  <Card
                    className="
                    group
                    text-center
                    p-6
                    bg-[var(--card)]
                    border border-[var(--border)]
                    rounded-2xl
                    transition-all duration-500
                    hover:-translate-y-2
                    hover:border-[var(--color-primary)]/40
                    hover:shadow-[0_0_40px_var(--glow-soft)]
                    "
                  >
                    <div className="text-6xl mb-4">👨‍⚕️</div>

                    <h3 className="font-semibold text-lg text-[var(--text)]">
                      {doc.name}
                    </h3>

                    <p className="text-[var(--color-primary)]">
                      {doc.specialty}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <AppointmentCTA
        variant="large"
        className="my-12 md:my-16 lg:my-20 mx-auto max-w-6xl"
      />
    </main>
  );
}
