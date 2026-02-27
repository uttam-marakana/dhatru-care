import { useParams } from "react-router-dom";
import Container from "../components/layout/Container";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import {
  FaCalendarCheck,
  FaPhoneAlt,
  FaGraduationCap,
  FaAward,
  FaMapMarkerAlt,
  FaStethoscope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Demo doctor data (in real app → fetch by :id from Redux/API/Firebase)
const demoDoctor = {
  id: "1",
  name: "Dr. Rajesh Patel",
  specialty: "Cardiologist",
  qualification: "MBBS, MD (Medicine), DM (Cardiology)",
  experience: "18+ years",
  rating: 4.9,
  reviews: 142,
  languages: ["English", "Hindi", "Gujarati"],
  availability: "Mon–Sat: 9:00 AM – 5:00 PM (by appointment)",
  location: "Dhatru Care Multispeciality Hospital, Gondal, Gujarat",
  bio: "Dr. Rajesh Patel is a senior interventional cardiologist with over 18 years of experience. He specializes in complex coronary interventions, heart failure management, and preventive cardiology. He has performed more than 5,000 procedures and is actively involved in cardiac research, teaching, and community health programs.",
  achievements: [
    "Gold Medalist in DM Cardiology",
    "Published 25+ research papers in national & international journals",
    "Fellow of the Cardiological Society of India (FCSI)",
    "Ex-Consultant at Apollo Hospitals, Ahmedabad",
  ],
  imagePlaceholder: "❤️",
};

const relatedDoctors = [
  { id: "2", name: "Dr. Priya Sharma", specialty: "Neurologist", rating: 4.8 },
  {
    id: "3",
    name: "Dr. Amit Shah",
    specialty: "Orthopedic Surgeon",
    rating: 5.0,
  },
  { id: "4", name: "Dr. Neha Mehta", specialty: "Pediatrician", rating: 4.9 },
];

export default function DoctorDetail() {
  const { id } = useParams();

  // In real app: useSelector or useQuery to fetch doctor by id
  // For now we use static demo data
  const doctor = demoDoctor; // ← replace with real fetch later

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top Hero / Profile Summary */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-gray-900 dark:to-gray-950 py-12 md:py-20">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10 lg:gap-12 items-start">
              {/* Left: Photo + Quick Actions */}
              <div className="md:col-span-1">
                <Card className="overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
                  <div className="aspect-[4/5] bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-9xl md:text-[12rem]">
                    {doctor.imagePlaceholder}
                  </div>

                  <div className="p-6 md:p-8 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                      {doctor.name}
                    </h1>
                    <p className="text-xl text-primary font-medium mb-4">
                      {doctor.specialty}
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base mb-8">
                      <div className="flex items-center gap-2">
                        <FaGraduationCap className="text-primary" />
                        <span>{doctor.experience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-500" />
                        <span>
                          {doctor.rating} ({doctor.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button size="lg" className="w-full">
                        <FaCalendarCheck className="mr-2" />
                        Book Appointment
                      </Button>

                      <Button variant="outline" size="lg" className="w-full">
                        <FaPhoneAlt className="mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right: Bio, Qualifications, Achievements */}
              <div className="md:col-span-2 space-y-10 md:space-y-12">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-5 text-gray-900 dark:text-white">
                    About Dr. {doctor.name.split(" ")[1]}
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    {doctor.bio}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-5 flex items-center gap-3">
                    <FaGraduationCap className="text-primary" />
                    Qualifications
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {doctor.qualification}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-5 flex items-center gap-3">
                    <FaAward className="text-primary" />
                    Key Achievements
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    {doctor.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">✔</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <FaCalendarCheck className="text-primary" />
                      Availability
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                      {doctor.availability}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-primary" />
                      Location
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                      {doctor.location}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    Languages Spoken
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {doctor.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Related Doctors Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-900 dark:text-white">
            Related Specialists
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {relatedDoctors.map((doc) => (
              <Link
                key={doc.id}
                to={`/doctors/${doc.id}`}
                className="block group"
              >
                <Card hover className="h-full text-center">
                  <div className="aspect-square bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-6xl md:text-8xl mb-6">
                    👨‍⚕️
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {doc.specialty}
                  </p>
                  <div className="flex justify-center items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaStar className="text-yellow-500" />
                    <span>{doc.rating}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <AppointmentCTA
        variant="large"
        className="my-12 md:my-16 lg:my-20 mx-4 md:mx-8 lg:mx-auto max-w-6xl rounded-3xl"
      />
    </div>
  );
}
