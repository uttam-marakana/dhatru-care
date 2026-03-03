import { lazy } from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaDirections } from "react-icons/fa";

const Container = lazy(() => import("../../components/layout/Container"));

export default function ContactMap() {
  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Blue Glow Aura */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/20 blur-[140px] rounded-full"></div>

      <Container>
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            Visit Dhatru Care
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            Conveniently located in the heart of Gondal with 24×7 emergency
            accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative z-10">
          {/* MAP */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] h-[350px] md:h-[450px] group">
            <iframe
              title="Hospital Location"
              src="https://www.google.com/maps/embed?..."
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              className="group-hover:scale-[1.02] transition duration-700"
            />

            {/* Directions Button */}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg shadow-blue-500/30 flex items-center gap-2 transition"
            >
              <FaDirections />
              Get Directions
            </a>
          </div>

          {/* INFO PANEL */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="flex items-center gap-3 mb-4 text-blue-400">
                <FaMapMarkerAlt />
                <h3 className="text-xl font-semibold">Hospital Address</h3>
              </div>

              <p className="text-gray-400 leading-relaxed">
                Dhatru Care Multispeciality Hospital <br />
                Gondal, Gujarat, India
              </p>
            </div>

            {/* Emergency Card (High Emphasis) */}
            <div className="relative bg-blue-600/20 border border-blue-400/40 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_40px_rgba(59,130,246,0.25)]">
              <div className="flex items-center gap-3 mb-4 text-blue-400">
                <FaPhoneAlt />
                <h4 className="text-lg font-semibold">
                  24×7 Emergency Support
                </h4>
              </div>

              <p className="text-3xl font-bold tracking-wide text-white">
                +91 98765 43210
              </p>
            </div>

            {/* General Enquiry Card */}
            <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <h4 className="font-semibold mb-2 text-blue-400">
                General Enquiry
              </h4>

              <p className="text-xl font-bold text-white">+91 12345 67890</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
