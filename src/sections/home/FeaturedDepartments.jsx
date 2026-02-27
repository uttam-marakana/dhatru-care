import Container from "../../components/layout/Container";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const departments = [
  { name: "Cardiology", desc: "Heart & vascular care", icon: "❤️" },
  { name: "Neurology", desc: "Brain & nervous system", icon: "🧠" },
  { name: "Orthopedics", desc: "Bones & joints", icon: "🦴" },
  { name: "Pediatrics", desc: "Child & newborn care", icon: "👶" },
];

export default function FeaturedDepartments() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Centres of Excellence
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Specialized departments with advanced technology and expert teams
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {departments.map((dept, i) => (
            <Card key={i} hover className="text-center group">
              <div className="text-5xl md:text-6xl mb-5">{dept.icon}</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {dept.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {dept.desc}
              </p>
              <Button variant="ghost" size="sm">
                Explore →
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
