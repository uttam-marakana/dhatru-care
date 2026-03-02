import { lazy } from "react";

// Dynamic imports for code splitting
const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));
const Button = lazy(() => import("../../components/common/Button"));

const packages = [
  {
    name: "Basic Health Check",
    price: "₹ 1,499",
    includes: ["CBC", "Sugar", "Lipid Profile", "Urine", "ECG"],
  },
  {
    name: "Executive Package",
    price: "₹ 3,999",
    includes: [
      "Full Body Check",
      "Thyroid",
      "Vitamin D",
      "Ultrasound",
      "X-Ray",
    ],
  },
  {
    name: "Master Health Check",
    price: "₹ 7,499",
    includes: ["All Tests + MRI/CT", "Cardiac Evaluation", "Cancer Markers"],
  },
  {
    name: "Senior Citizen Package",
    price: "₹ 2,999",
    includes: ["Bone Density", "Eye Check", "Dental", "Physio Consultation"],
  },
];

export default function HealthPackages({ fullWidth = false }) {
  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Preventive Health Packages
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Early detection is the best protection – choose the right package
            for you and your family
          </p>
        </div>

        <div
          className={`grid grid-cols-1 ${fullWidth ? "md:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-4"} gap-6 md:gap-8`}
        >
          {packages.map((pkg, index) => (
            <Card
              key={index}
              hover
              className="text-center group border-2 border-transparent hover:border-primary/30 transition-all"
            >
              <div className="bg-primary/10 dark:bg-primary/20 py-6 px-4 rounded-t-xl">
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">
                  {pkg.name}
                </h3>
                <p className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                  {pkg.price}
                </p>
              </div>

              <div className="p-6">
                <ul className="space-y-3 text-left text-gray-700 dark:text-gray-300 mb-6">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-500">✔</span> {item}
                    </li>
                  ))}
                </ul>

                <Button variant="primary" size="md" className="w-full">
                  Book Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Compare All Packages →
          </Button>
        </div>
      </Container>
    </section>
  );
}
