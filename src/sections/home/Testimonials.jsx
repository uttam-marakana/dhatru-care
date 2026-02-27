import Container from "../../components/layout/Container";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

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

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            What Our Patients Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Real stories from people who trusted us with their health
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, index) => (
            <Card key={index} className="relative">
              <div className="text-5xl text-primary/20 absolute top-4 left-4">
                “
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                {t.text}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.location}
                  </p>
                </div>
                <div className="flex text-yellow-500">
                  {"★".repeat(t.rating)}
                  {"☆".repeat(5 - t.rating)}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Read More Reviews →
          </Button>
        </div>
      </Container>
    </section>
  );
}
