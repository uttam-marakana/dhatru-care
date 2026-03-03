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
    <section className="relative py-20 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Same Blue Glow Aura */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/20 blur-[140px] rounded-full"></div>

      <Container>
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            Comprehensive Care, Simplified
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            Quick access to essential healthcare services — book, consult,
            track, and manage your care seamlessly.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {actions.map(({ id, icon: Icon, title, desc }) => (
            <div
              key={id}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Icon Container */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 text-3xl group-hover:scale-110 transition duration-500">
                  <Icon />
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">{title}</h3>

              <p className="text-gray-400 mb-6 text-sm md:text-base leading-relaxed">
                {desc}
              </p>

              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-white"
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
