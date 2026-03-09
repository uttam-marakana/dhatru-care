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
    desc: "Consult experienced doctors from the comfort of home.",
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
    <section className="relative py-20 md:py-24 bg-[var(--bg)] text-[var(--text)] overflow-hidden">
      {/* Glow background */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-175 bg-[var(--glow-bg)] blur-[140px] rounded-full"></div>

      <Container>
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
            Comprehensive Care, Simplified
          </h2>

          <p className="mt-5 text-[var(--text-secondary)] max-w-2xl mx-auto">
            Quick access to essential healthcare services — book, consult,
            track, and manage your care seamlessly.
          </p>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {actions.map(({ id, icon: Icon, title, desc }) => (
            <div
              key={id}
              className="
              group
              relative
              bg-[var(--card)]
              border border-[var(--border)]
              rounded-2xl
              p-8
              text-center
              transition-all duration-500
              hover:-translate-y-2
              hover:border-[var(--color-primary)]/40
              hover:shadow-[0_0_40px_var(--glow-soft)]
              "
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div
                  className="
                  w-16 h-16
                  flex items-center justify-center
                  rounded-xl
                  bg-[var(--surface)]
                  text-[var(--color-primary)]
                  text-3xl
                  group-hover:scale-110
                  transition duration-500
                  "
                >
                  <Icon />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3 text-[var(--text)]">
                {title}
              </h3>

              {/* Description */}
              <p className="text-[var(--text-secondary)] mb-6 text-sm md:text-base leading-relaxed">
                {desc}
              </p>

              {/* CTA */}
              <Button
                variant="ghost"
                size="sm"
                className="text-[var(--color-primary)] hover:text-white"
              >
                Get Started →
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
