import { FaPhoneAlt, FaMapMarkerAlt, FaDirections } from "react-icons/fa";

import Container from "../../components/layout/Container";

export default function ContactMap() {
  return (
    <section className="relative py-10 md:py-12 bg-[var(--bg)] text-[var(--text)] overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-162.5 h-162.5 bg-[var(--glow-bg)] blur-[140px] rounded-full"></div>

      <Container>
        <div className="text-center mb-16">
<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
            Visit Dhatru Care
          </h2>

          <p className="mt-5 text-[var(--text-secondary)] max-w-2xl mx-auto">
            Conveniently located in the heart of Gondal with 24×7 emergency
            access.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* --- MAP ----------- */}
<div className="relative rounded-3xl overflow-hidden border border-[var(--border)] shadow-[0_0_40px_var(--glow-soft)] h-[300px] sm:h-[450px]">
            <iframe
              title="Hospital Location"
              src="https://www.google.com/maps/embed?..."
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
                absolute bottom-6 left-1/2 
                -translate-x-1/2
                bg-[var(--color-primary)] 
hover:bg-[var(--color-primary-hover)]
                text-white px-6 py-3 
                rounded-full flex 
                items-center gap-2
              "
            >
              <FaDirections />
              Get Directions
            </a>
          </div>

          {/* --- INFO ----------- */}
          <div className="space-y-8">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4 text-[var(--color-primary)]">
                <FaMapMarkerAlt />
                <h3 className="text-xl font-semibold">Hospital Address</h3>
              </div>

              <p className="text-[var(--text-secondary)]">
                Dhatru Care Multispeciality Hospital
                <br />
                Gondal, Gujarat, India
              </p>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4 text-[var(--color-primary)]">
                <FaPhoneAlt />
                <h4 className="text-lg font-semibold">
                  24×7 Emergency Support
                </h4>
              </div>

              <p className="text-xl font-bold">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
