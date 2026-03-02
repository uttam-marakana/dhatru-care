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
      <div className="min-h-screen flex items-center justify-center">
        Loading doctor...
      </div>
    );

  if (error || !doctor)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="py-12 md:py-20 bg-linear-to-br from-primary/10 to-secondary/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            <Card className="p-6 text-center">
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

              <h1 className="text-2xl font-bold">{doctor.name}</h1>
              <p className="text-primary">{doctor.specialty}</p>

              <div className="flex justify-center gap-4 mt-4 text-sm">
                <span>{doctor.experience}</span>
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  {doctor.rating || 4.9}
                </span>
              </div>

              <div className="space-y-3 mt-6">
                <Button className="w-full">
                  <FaCalendarCheck className="mr-2" />
                  Book Appointment
                </Button>
                <Button variant="outline" className="w-full">
                  <FaPhoneAlt className="mr-2" />
                  Call Now
                </Button>
              </div>
            </Card>

            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-3">About</h2>
                <p>{doctor.bio}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold flex gap-2 items-center">
                  <FaGraduationCap className="text-primary" />
                  Qualification
                </h3>
                <p>{doctor.qualification}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold flex gap-2 items-center">
                  <FaAward className="text-primary" />
                  Achievements
                </h3>
                <ul className="space-y-2">
                  {(doctor.achievements || []).map((a, i) => (
                    <li key={i}>✔ {a}</li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <p>
                  <FaCalendarCheck className="inline mr-2 text-primary" />
                  {doctor.availability}
                </p>
                <p>
                  <FaMapMarkerAlt className="inline mr-2 text-primary" />
                  {doctor.location}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {relatedDoctors.length > 0 && (
        <section className="py-16">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-10">
              Related Specialists
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedDoctors.map((doc) => (
                <Link key={doc.id} to={`/doctors/${doc.id}`}>
                  <Card hover className="h-full text-center p-4">
                    <div className="text-6xl mb-3">👨‍⚕️</div>
                    <h3 className="font-bold line-clamp-2">{doc.name}</h3>
                    <p className="text-primary">{doc.specialty}</p>
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
