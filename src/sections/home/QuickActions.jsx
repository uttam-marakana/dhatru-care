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
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/20 blur-[140px] rounded-full"></div>

      <Container>
        <div className="text-center mb-14 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Comprehensive Care, Simplified
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Quick access to essential healthcare services — book, consult,
            track, and manage your care seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {actions.map(({ id, icon: Icon, title, desc }) => (
            <div
              key={id}
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]"
            >
              <div className="flex justify-center text-4xl text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                <Icon />
              </div>

              <h3 className="text-xl font-semibold mb-3">{title}</h3>

              <p className="text-gray-400 mb-6 text-sm md:text-base leading-relaxed">
                {desc}
              </p>

              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-white transition-colors"
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
