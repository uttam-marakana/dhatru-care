import Container from "../../components/layout/Container";
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
    desc: "Schedule your in-clinic visit with our specialists.",
  },
  {
    id: "video",
    icon: FaVideo,
    title: "Video Consultation",
    desc: "Consult experienced doctors from home.",
  },
  {
    id: "checkup",
    icon: FaHeartbeat,
    title: "Health Checkups",
    desc: "Explore preventive and diagnostic health packages.",
  },
  {
    id: "reports",
    icon: FaFileMedical,
    title: "View Reports",
    desc: "Secure access to lab and radiology reports.",
  },
];

export default function QuickActions() {
  return (
    <section className="py-20 md:py-24 bg-(--bg) text-(--text)">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-(--color-primary)">
            Comprehensive Care, Simplified
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {actions.map(({ id, icon: Icon, title, desc }) => (
            <div
              key={id}
              className="bg-(--card) border border-(--border)
              rounded-2xl p-8 text-center hover:shadow-[0_0_40px_var(--glow-soft)]"
            >
              <Icon className="text-4xl text-(--color-primary) mx-auto mb-4" />

              <h3 className="text-xl font-semibold mb-3">{title}</h3>

              <p className="text-(--text-secondary) mb-6">{desc}</p>

              <Button variant="ghost" size="sm">
                Get Started →
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
