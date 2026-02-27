import Container from "../../components/layout/Container";
import Card from "../../components/common/Card";

const facilities = [
  {
    title: "24×7 Emergency & Trauma",
    desc: "Rapid response team and advanced life support",
    icon: "🚑",
  },
  {
    title: "Modern Operation Theatres",
    desc: "Laminar airflow, HEPA filters, modular OT",
    icon: "🩺",
  },
  {
    title: "Advanced Diagnostic Imaging",
    desc: "MRI, CT, Ultrasound, Digital X-Ray",
    icon: "📷",
  },
  {
    title: "Fully Equipped ICU & NICU",
    desc: "Ventilators, monitors, neonatal care unit",
    icon: "🩹",
  },
  {
    title: "In-house Pharmacy & Lab",
    desc: "24-hour service, NABL accredited lab",
    icon: "💊",
  },
  {
    title: "Physiotherapy & Rehab",
    desc: "Post-surgical recovery & chronic pain management",
    icon: "🏃",
  },
];

export default function Facilities() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950/50">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            State-of-the-Art Facilities
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Equipped with the latest medical technology to ensure accurate
            diagnosis and effective treatment
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {facilities.map((item, index) => (
            <Card key={index} hover className="text-center group">
              <div className="text-5xl md:text-6xl mb-6 opacity-90 group-hover:opacity-100 transition-opacity">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
