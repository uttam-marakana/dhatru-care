import Container from "../../components/layout/Container";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import {
  FaCalendarCheck,
  FaVideo,
  FaHeartbeat,
  FaFileMedical,
} from "react-icons/fa";

const actions = [
  {
    icon: FaCalendarCheck,
    title: "Book Appointment",
    desc: "Schedule in-clinic visit",
    color: "text-primary",
  },
  {
    icon: FaVideo,
    title: "Video Consultation",
    desc: "Consult from home",
    color: "text-teal-600 dark:text-teal-400",
  },
  {
    icon: FaHeartbeat,
    title: "Health Checkups",
    desc: "Preventive packages",
    color: "text-rose-600 dark:text-rose-400",
  },
  {
    icon: FaFileMedical,
    title: "View Reports",
    desc: "Access lab & radiology",
    color: "text-amber-600 dark:text-amber-400",
  },
];

export default function QuickActions() {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {actions.map((action, i) => (
            <Card key={i} hover padding="p-6" className="text-center group">
              <div className={`text-4xl md:text-5xl mb-4 ${action.color}`}>
                <action.icon />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {action.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm md:text-base">
                {action.desc}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="group-hover:text-primary"
              >
                Learn more →
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
