// src/pages/DepartmentDetail.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "../components/layout/Container";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import AppointmentCTA from "../sections/shared/AppointmentCTA";
import { FaStethoscope, FaChartLine, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// Demo data – in real app fetch by slug from Redux / Firebase / API
const departmentsData = {
  cardiology: {
    name: "Cardiology",
    icon: "❤️",
    description:
      "Our Cardiology department provides comprehensive heart and vascular care, from preventive screenings to complex interventions and rehabilitation.",
    services: [
      "ECG, Echocardiography, Stress Test",
      "Coronary Angiography & Angioplasty",
      "Heart Failure Management",
      "Electrophysiology & Pacemaker Implantation",
      "Cardiac Rehabilitation Program",
    ],
    doctorsCount: 8,
    highlights: [
      "State-of-the-art Cath Lab with 24×7 emergency PCI",
      "Dedicated Heart Failure Clinic",
      "Advanced Non-Invasive Imaging",
    ],
    bgGradient:
      "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30",
  },
  neurology: {
    name: "Neurology",
    icon: "🧠",
    description:
      "Specialized care for brain, spine, and nervous system disorders with advanced diagnostics and neuro-rehabilitation support.",
    services: [
      "EEG, EMG, Nerve Conduction Studies",
      "Stroke Unit & Thrombolysis",
      "Epilepsy Monitoring & Surgery",
      "Movement Disorders & Botox Therapy",
      "Neuro-Rehabilitation",
    ],
    doctorsCount: 6,
    highlights: [
      "Dedicated Stroke ICU",
      "Advanced Neuro-Imaging (MRI, CT)",
      "Comprehensive Epilepsy Center",
    ],
    bgGradient:
      "from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30",
  },
  // Add more as needed...
};

function DepartmentDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-pulse">
      {/* Hero banner skeleton */}
      <div className="bg-gray-200 dark:bg-gray-800 h-64 md:h-96 py-20 md:py-32">
        <Container>
          <div className="text-center max-w-5xl mx-auto">
            <div className="h-32 w-32 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full mb-6" />
            <div className="h-12 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mx-auto mb-4" />
            <div className="h-6 w-2/3 bg-gray-300 dark:bg-gray-700 rounded mx-auto" />
          </div>
        </Container>
      </div>

      {/* Content skeleton */}
      <section className="py-12 md:py-20">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-8">
              <div className="h-10 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded"
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default function DepartmentDetail() {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading (replace with real fetch later)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [slug]);

  if (isLoading) {
    return <DepartmentDetailSkeleton />;
  }

  const department = departmentsData[slug] || {
    name: "Department Not Found",
    description: "The requested department could not be found.",
    services: [],
    highlights: [],
    doctorsCount: 0,
    bgGradient: "from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top Banner / Hero */}
      <div
        className={`bg-gradient-to-br ${department.bgGradient} py-12 md:py-20 lg:py-24`}
      >
        <Container>
          <div className="max-w-5xl mx-auto text-center">
            <div className="text-8xl md:text-9xl mb-6">{department.icon}</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              {department.name}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
              {department.description}
            </p>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-20 lg:py-24">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Services */}
            <Card className="col-span-1 md:col-span-2 lg:col-span-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
                <FaStethoscope className="text-primary" />
                Our Services
              </h2>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                {department.services.length > 0 ? (
                  department.services.map((service, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-lg">
                      <span className="text-green-500 mt-1 text-xl">✔</span>
                      <span>{service}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No services listed
                  </p>
                )}
              </ul>
            </Card>

            {/* Highlights */}
            <Card className="col-span-1 md:col-span-1 lg:col-span-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
                <FaChartLine className="text-primary" />
                Key Highlights
              </h2>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                {department.highlights.length > 0 ? (
                  department.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-lg">
                      <span className="text-primary mt-1 text-xl">★</span>
                      <span>{highlight}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No highlights listed
                  </p>
                )}
              </ul>

              <p className="mt-8 text-lg font-medium text-primary">
                {department.doctorsCount} Expert Specialists Available
              </p>
            </Card>

            {/* Quick Stats / CTA */}
            <Card className="col-span-1 md:col-span-2 lg:col-span-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Why Choose Us?
              </h2>
              <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
                <p>• 24×7 Emergency & Critical Care Support</p>
                <p>• Advanced Diagnostic & Therapeutic Facilities</p>
                <p>• Multidisciplinary Team Approach</p>
                <p>• Patient-Centered Care & Rehabilitation</p>
              </div>

              <div className="mt-10">
                <Button size="lg" className="w-full">
                  Book Consultation
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA Banner */}
      <AppointmentCTA
        variant="large"
        className="my-12 md:my-16 lg:my-20 mx-4 md:mx-8 lg:mx-auto max-w-6xl rounded-3xl"
      />
    </div>
  );
}
