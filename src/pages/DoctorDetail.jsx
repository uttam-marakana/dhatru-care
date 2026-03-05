import { useParams, Link } from "react-router-dom";
import { useState, useEffect, lazy } from "react";
import { getDoctorById, getDoctors } from "../api/doctorsApi";

import {
  FaCalendarCheck,
  FaPhoneAlt,
  FaGraduationCap,
  FaAward,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

const Container = lazy(() => import("../components/layout/Container"));
const Button = lazy(() => import("../components/common/Button"));
const Card = lazy(() => import("../components/common/Card"));
const AppointmentCTA = lazy(() => import("../sections/shared/AppointmentCTA"));
const Breadcrumb = lazy(() => import("../components/common/Breadcrumb"));

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
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 dark:text-gray-300">
        Loading doctor...
      </div>
    );

  if (error || !doctor)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 dark:bg-gray-950">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Doctors", path: "/doctors" },
          { label: doctor?.name || "Profile" },
        ]}
      />

      {/* HERO SECTION */}
      <div className="relative py-12 md:py-20 bg-linear-to-br from-primary/10 to-secondary/10 dark:bg-transparent overflow-hidden">
        {/* Dark Mode Glow */}
        <div className="hidden dark:block absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/20 blur-[150px] rounded-full"></div>

        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative z-10">
            {/* PROFILE CARD */}
            <Card
              className="p-6 text-center 
              dark:bg-white/5 dark:backdrop-blur-md 
              dark:border dark:border-white/10 
              dark:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
            >
              <div className="mb-4">
                {doctor.imageUrl ? (
                  <img
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover"
                  />
                ) : (
                  <div className="text-8xl">🩺</div>
                )}
              </div>

              <h1 className="text-2xl font-bold dark:bg-gradient-to-r dark:from-blue-400 dark:to-cyan-300 dark:bg-clip-text dark:text-transparent">
                {doctor.name}
              </h1>

              <p className="text-primary dark:text-blue-400">
                {doctor.specialty}
              </p>

              <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{doctor.experience}</span>
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  {doctor.rating || 4.9}
                </span>
              </div>

              <div className="space-y-3 mt-6">
                <Link to="/appointments">
                  <Button
                    size="lg"
                    leftIcon={<FaCalendarCheck />}
                    className="min-w-48"
                  >
                    Book Appointment
                  </Button>
                </Link>

                <Button variant="outline" className="w-full">
                  <FaPhoneAlt className="mr-2" />
                  Call Now
                </Button>
              </div>
            </Card>

            {/* DETAILS */}
            <div className="md:col-span-2 space-y-8 text-gray-800 dark:text-gray-300">
              <div>
                <h2 className="text-2xl font-bold mb-3 dark:bg-gradient-to-r dark:from-blue-400 dark:to-cyan-300 dark:bg-clip-text dark:text-transparent">
                  About
                </h2>
                <p>{doctor.bio}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold flex gap-2 items-center dark:bg-gradient-to-r dark:from-blue-400 dark:to-cyan-300 dark:bg-clip-text dark:text-transparent">
                  <FaGraduationCap className="text-primary dark:text-blue-400" />
                  Qualification
                </h3>
                <p>{doctor.qualification}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold flex gap-2 items-center dark:bg-gradient-to-r dark:from-blue-400 dark:to-cyan-300 dark:bg-clip-text dark:text-transparent">
                  <FaAward className="text-primary dark:text-blue-400" />
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
                  <FaCalendarCheck className="inline mr-2 text-primary dark:text-blue-400" />
                  {doctor.availability}
                </p>
                <p>
                  <FaMapMarkerAlt className="inline mr-2 text-primary dark:text-blue-400" />
                  {doctor.location}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* RELATED DOCTORS */}
      {relatedDoctors.length > 0 && (
        <section className="py-16 dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-10 dark:bg-gradient-to-r dark:from-blue-400 dark:to-cyan-300 dark:bg-clip-text dark:text-transparent">
              Related Specialists
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedDoctors.map((doc) => (
                <Link key={doc.id} to={`/doctors/${doc.id}`}>
                  <Card
                    hover
                    className="h-full text-center p-4 
                    dark:bg-white/5 dark:backdrop-blur-md 
                    dark:border dark:border-white/10 
                    dark:hover:border-blue-400/40 
                    dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] 
                    transition-all duration-500"
                  >
                    <div className="text-6xl mb-3">👨‍⚕️</div>
                    <h3 className="font-bold line-clamp-2">{doc.name}</h3>
                    <p className="text-primary dark:text-blue-400">
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
    </div>
  );
}
