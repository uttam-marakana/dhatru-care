import { lazy } from "react";
import Hospital_Img from "../../assets/images/hospital_img.png";

const Container = lazy(() => import("../../components/layout/Container"));

export default function AboutHospital() {
  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Blue Glow Aura (Same System) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-blue-600/20 blur-[140px] rounded-full"></div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center relative z-10">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Welcome to Dhatru Care
            </h2>

            <p className="text-lg text-gray-400 leading-relaxed mb-6">
              Dhatru Care Multispeciality Hospital is dedicated to delivering
              advanced healthcare solutions with compassion, innovation, and
              clinical excellence.
            </p>

            <p className="text-lg text-gray-400 leading-relaxed mb-10">
              With modern infrastructure and a highly experienced medical team,
              we ensure personalized treatment and round-the-clock patient
              support.
            </p>

            {/* Glass Trust Metrics */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "15+", label: "Years of Excellence" },
                { value: "50K+", label: "Patients Treated" },
                { value: "30+", label: "Expert Doctors" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
                >
                  <h3 className="text-2xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition duration-500">
                    {item.value}
                  </h3>
                  <p className="text-sm text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="relative group">
            {/* Glow Frame */}
            <div className="absolute -inset-4 rounded-3xl bg-blue-600/20 blur-3xl opacity-50 group-hover:opacity-70 transition duration-500"></div>

            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={Hospital_Img}
                alt="Dhatru Care Hospital"
                className="w-full h-[350px] sm:h-[420px] md:h-[480px] object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
