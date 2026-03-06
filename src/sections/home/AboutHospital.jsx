import { lazy } from "react";
import Hospital_Img from "../../assets/images/hospital_img.png";

const Container = lazy(() => import("../../components/layout/Container"));

export default function AboutHospital() {
  return (
    <section className="relative py-20 md:py-24 bg-(--bg) text-(--text) overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-165.5 h-165.5 bg-(--glow-bg) blur-[140px] rounded-full"></div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center relative z-10">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-primary)]">
              Welcome to Dhatru Care
            </h2>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
              Dhatru Care Multispeciality Hospital is dedicated to delivering
              advanced healthcare solutions with compassion, innovation, and
              clinical excellence.
            </p>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10">
              With modern infrastructure and a highly experienced medical team,
              we ensure personalized treatment and round-the-clock support.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "15+", label: "Years of Excellence" },
                { value: "50K+", label: "Patients Treated" },
                { value: "30+", label: "Expert Doctors" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group bg-(--card) border border-(--border)
                  rounded-xl p-6 text-center transition-all duration-500
                  hover:-translate-y-1 hover:border-[var(--color-primary)]/40
                  hover:shadow-[0_0_30px_var(--glow-soft)]"
                >
                  <h3 className="text-2xl font-bold text-[var(--color-primary)]">
                    {item.value}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative group">
            <div className="absolute -inset-4 rounded-3xl bg-(--glow-bg) blur-3xl opacity-60"></div>

            <div className="relative rounded-3xl overflow-hidden border border-(--border) shadow-xl">
              <img
                src={Hospital_Img}
                alt="Dhatru Care Hospital"
                className="w-full h-105 object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
