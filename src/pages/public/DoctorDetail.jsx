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
  FaCheckCircle,
} from "react-icons/fa";

import Container from "../../components/layout/Container";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

const AppointmentCTA = lazy(
  () => import("../../sections/shared/AppointmentCTA"),
);

import Breadcrumb from "../../components/common/Breadcrumb";

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

      {/* --- HERO ----------- */}
      <div className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-175 bg-[var(--glow-bg)] blur-[150px] rounded-full"></div>

        <Container>
          <div className="grid lg:grid-cols-5 gap-12 relative z-10 items-start">
            {/* --- PROFILE CARD ----------- */}
            <div className="lg:col-span-2">
              <Card
                className="
                  relative
                  p-6 text-center
                  bg-[var(--card)]
                  border border-[var(--border)]
                  shadow-[0_0_40px_var(--glow-soft)]
                  md:sticky md:top-28
                  transition-all duration-500
                  hover:shadow-[0_0_70px_var(--glow-soft)]
                  hover:-translate-y-1
                "
              >
                {/* --- Animated Halo Glow ----------- */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-primary)]/10 via-transparent to-[var(--color-primary)]/10 opacity-0 hover:opacity-100 blur-2xl transition duration-700"></div>

                {/* --- Doctor Image ----------- */}
                <div className="relative w-32 h-32 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-full bg-[var(--glow-bg)] blur-xl opacity-60"></div>

                  {doctor.imageUrl ? (
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      className="relative w-32 h-32 rounded-full object-cover border-4 border-[var(--color-primary)] shadow-lg"
                    />
                  ) : (
                    <div className="relative w-32 h-32 rounded-full bg-[var(--surface)] flex items-center justify-center text-6xl border-4 border-[var(--color-primary)]">
                      🩺
                    </div>
                  )}
                </div>

                {/* --- Name + Verification ----------- */}
                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-2xl font-bold text-[var(--color-primary)]">
                    {doctor.name}
                  </h1>

                  <span className="text-green-400 flex items-center gap-1 text-sm">
                    <FaCheckCircle />
                    Verified
                  </span>
                </div>

                <p className="text-[var(--text-secondary)]">
                  {doctor.specialty}
                </p>

                {/* --- Badges ----------- */}
                <div className="flex justify-center gap-3 mt-4 flex-wrap">
                  <span className="px-3 py-1 text-sm rounded-full bg-[var(--surface)] border border-[var(--border)]">
                    {doctor.experience}
                  </span>

                  <span className="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-yellow-500/10 border border-yellow-400 text-yellow-400">
                    <FaStar />
                    {doctor.rating || 4.9}
                  </span>
                </div>

                {/* --- TRUST STATS ----------- */}
                <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg py-3">
                    <p className="font-bold text-[var(--color-primary)]">15+</p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Years Exp
                    </p>
                  </div>

                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg py-3">
                    <p className="font-bold text-[var(--color-primary)]">2k+</p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Patients
                    </p>
                  </div>

                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg py-3">
                    <p className="font-bold text-[var(--color-primary)]">4.9</p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Rating
                    </p>
                  </div>
                </div>

                {/* --- ACTION BUTTONS ----------- */}
                <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-3 mt-6 w-full relative z-10">
                  <Link
                    to={`/appointments?department=${doctor.departmentId}&doctor=${doctor.id}`}
                    className="block w-full cursor-pointer"
                  >
                    <Button
                      size="lg"
                      leftIcon={<FaCalendarCheck />}
                      className="
                        w-full
                        cursor-pointer
                        bg-gradient-to-r
                        from-[var(--color-primary)]
                        to-[var(--color-primary-hover)]
                        text-white
                        shadow-[0_0_25px_var(--glow-soft)]
                        hover:shadow-[0_0_40px_var(--glow-soft)]
                        transition-all
                      "
                    >
                      Book Appointment
                    </Button>
                  </Link>

                  <a
                    href="tel:+919876543210"
                    className="block w-full cursor-pointer"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full flex items-center justify-center cursor-pointer"
                    >
                      <FaPhoneAlt className="mr-2" />
                      Call Now
                    </Button>
                  </a>
                </div>
              </Card>
            </div>

            {/* --- DOCTOR DETAILS ----------- */}
            <div className="lg:col-span-3">
              <div
                className="
                  relative
                  bg-[var(--card)]/70
                  backdrop-blur-xl
                  border border-[var(--border)]
                  rounded-3xl
                  p-8 md:p-10
                  shadow-[0_0_50px_var(--glow-soft)]
                "
              >
                <div className="absolute inset-0 rounded-3xl bg-[var(--glow-bg)] blur-3xl opacity-20 pointer-events-none"></div>

                <div className="relative space-y-8 text-[var(--text-secondary)]">
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
            </div>
          </div>
        </Container>
      </div>

      {/* --- RELATED DOCTORS ----------- */}
      {relatedDoctors.length > 0 && (
        <section className="relative py-20 md:py-24 bg-[var(--section)] text-[var(--text)] overflow-hidden">
          <div
            className="
              pointer-events-none 
              absolute 
              -top-40 left-1/2 
              -translate-x-1/2 
              w-[700px] md:w-[900px] 
              h-[700px] md:h-[900px] 
              bg-[var(--glow-bg)] 
              blur-[140px] 
              rounded-full 
              opacity-70 z-0
            "
          />

          <Container className="relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
                Related Specialists
              </h2>

              <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
                Meet other experienced doctors specializing in similar fields.
              </p>
            </div>

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
                    hover:-translate-y-3
                    hover:border-[var(--color-primary)]/40
                    hover:shadow-[0_0_50px_var(--glow-soft)]
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
