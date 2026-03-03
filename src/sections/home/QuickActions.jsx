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
    id: "appointment",
    icon: FaCalendarCheck,
    title: "Book Appointment",
    desc: "Schedule in-clinic visit",
    color: "text-primary",
  },
  {
    id: "video",
    icon: FaVideo,
    title: "Video Consultation",
    desc: "Consult from home",
    color: "text-teal-600 dark:text-teal-400",
  },
  {
    id: "checkup",
    icon: FaHeartbeat,
    title: "Health Checkups",
    desc: "Preventive packages",
    color: "text-rose-600 dark:text-rose-400",
  },
  {
    id: "reports",
    icon: FaFileMedical,
    title: "View Reports",
    desc: "Access lab & radiology",
    color: "text-amber-600 dark:text-amber-400",
  },
];

export default function QuickActions() {
  return (
    <section className="py-14 md:py-20 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map(({ id, icon: Icon, title, desc, color }) => (
            <Card
              key={id}
              hover
              padding="p-6"
              className="text-center group h-full"
            >
              <div className={`text-4xl md:text-5xl mb-4 ${color}`}>
                <Icon />
              </div>

              <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm md:text-base">
                {desc}
              </p>

              <Button
                variant="ghost"
                size="sm"
                className="group-hover:text-primary transition-colors"
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
