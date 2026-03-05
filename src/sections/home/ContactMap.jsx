import { lazy } from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaDirections } from "react-icons/fa";

const Container = lazy(() => import("../../components/layout/Container"));

export default function ContactMap() {
  return (
    <section className="relative py-20 md:py-24 bg-linear-to-b from-[#030712] via-[#111827] to-[#030712] text-white overflow-hidden">
      {/* Blue Glow Aura */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-175 bg-[#60A5FA]/20 blur-[140px] rounded-full"></div>

      <Container>
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-[#60A5FA] to-[#67E8F9] bg-clip-text text-transparent">
            Visit Dhatru Care
          </h2>

          <p className="mt-5 text-[#9CA3AF] max-w-2xl mx-auto">
            Conveniently located in the heart of Gondal with 24×7 emergency
            accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative z-10">
          {/* MAP */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.25)] h-87.5 md:h-112.5 group">
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
              className="absolute bottom-6 left-1/2 -translate-x-1/2 
              bg-linear-to-r from-[#60A5FA] to-[#67E8F9]
              hover:from-[#3B82F6] hover:to-[#60A5FA]
              text-[#030712]
              px-6 py-3 rounded-full
              shadow-[0_0_20px_rgba(59,130,246,0.35)]
              flex items-center gap-2
              font-semibold
              transition-all duration-300"
            >
              <FaDirections />
              Get Directions
            </a>
          </div>

          {/* INFO PANEL */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-[#60A5FA]/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-[#60A5FA]/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="flex items-center gap-3 mb-4 text-[#60A5FA]">
                <FaMapMarkerAlt />
                <h3 className="text-xl font-semibold">Hospital Address</h3>
              </div>

              <p className="text-[#9CA3AF] leading-relaxed">
                Dhatru Care Multispeciality Hospital <br />
                Gondal, Gujarat, India
              </p>
            </div>

            {/* Emergency Card */}
            <div className="relative bg-[#60A5FA]/20 border border-[#60A5FA]/40 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_40px_rgba(59,130,246,0.25)]">
              <div className="flex items-center gap-3 mb-4 text-[#60A5FA]">
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
            <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-[#60A5FA]/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-[#60A5FA]/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <h4 className="font-semibold mb-2 text-[#60A5FA]">
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
