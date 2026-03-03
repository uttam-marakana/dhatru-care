import { lazy } from "react";

const Container = lazy(() => import("../../components/layout/Container"));
import Hospital_Img from "../../assets/images/hospital_img.png";

export default function AboutHospital() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Welcome to <span className="text-primary">Dhatru Care</span>
            </h2>

            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Dhatru Care Multispeciality Hospital is committed to delivering
              world-class healthcare with compassion, innovation, and
              excellence.
            </p>

            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our team works 24×7 to ensure every patient receives personalized
              care.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl border bg-gray-100 dark:bg-gray-800 h-65 sm:h-80 md:h-95 flex items-center justify-center">
            <img
              src={Hospital_Img}
              alt="Dhatru Care Hospital"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
