import { lazy } from "react";

// Dynamic imports for code splitting
const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));
const Button = lazy(() => import("../../components/common/Button"));

const testimonials = [
  {
    name: "Mrs. Rekha Parmar",
    location: "Gondal",
    text: "The care I received during my heart procedure was exceptional. Dr. Patel and the entire team were very supportive. I'm feeling much better now.",
    rating: 5,
  },
  {
    name: "Mr. Jayesh Solanki",
    location: "Jetpur",
    text: "My child's emergency treatment was handled very professionally. The pediatric team is outstanding. Thank you Dhatru Care!",
    rating: 5,
  },
  {
    name: "Anita Vadgama",
    location: "Rajkot",
    text: "Best hospital in the region for orthopedics. My knee replacement surgery went smoothly and recovery was faster than expected.",
    rating: 5,
  },
];

export default function Testimonials({ testimonials = [] }) {
  if (!testimonials.length) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            What Our Patients Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Real stories from people who trusted us with their health
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="h-full flex flex-col">
              <p className="text-gray-700 dark:text-gray-300 italic flex-1">
                {t.text}
              </p>

              <div className="mt-6">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-500">{t.location}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline">Read More Reviews →</Button>
        </div>
      </Container>
    </section>
  );
}
