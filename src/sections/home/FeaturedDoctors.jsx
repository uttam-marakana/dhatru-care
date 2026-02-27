import Container from "../../components/layout/Container";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { FaStethoscope } from "react-icons/fa";

const featuredDoctors = [
  {
    name: "Dr. Rajesh Patel",
    specialty: "Cardiologist",
    experience: "18+ years",
    rating: "4.9",
  },
  {
    name: "Dr. Priya Sharma",
    specialty: "Neurologist",
    experience: "15+ years",
    rating: "4.8",
  },
  {
    name: "Dr. Amit Shah",
    specialty: "Orthopedic Surgeon",
    experience: "20+ years",
    rating: "5.0",
  },
  {
    name: "Dr. Neha Mehta",
    specialty: "Pediatrician",
    experience: "12+ years",
    rating: "4.9",
  },
];

export default function FeaturedDoctors() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Expert Doctors
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Highly experienced specialists dedicated to your well-being
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredDoctors.map((doctor, index) => (
            <Card
              key={index}
              hover
              className="text-center group overflow-hidden"
            >
              <div className="aspect-square bg-gray-200 dark:bg-gray-800 mb-5 rounded-t-xl flex items-center justify-center text-6xl">
                👨‍⚕️ {/* Placeholder – replace with real images later */}
              </div>
              <div className="px-5 pb-6">
                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-primary font-medium mb-2">
                  {doctor.specialty}
                </p>
                <div className="flex justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>{doctor.experience}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span> {doctor.rating}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-primary group-hover:text-white transition-colors"
                >
                  Book Consultation
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg">View All Doctors →</Button>
        </div>
      </Container>
    </section>
  );
}
