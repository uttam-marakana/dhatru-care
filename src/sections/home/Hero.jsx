import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import Button from "../../components/common/Button";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] md:min-h-[95vh] flex items-center bg-(--bg) text-(--text) overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-(--glow-bg) blur-[140px] opacity-40"></div>

      <Container className="relative z-10 py-16 md:py-24">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Your Health,
            <br className="hidden sm:block" />
            <span className="text-(--color-primary)">Our Priority</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-(--text-secondary) mb-10 max-w-3xl">
            Premium multispeciality hospital in Gondal offering compassionate
            care, advanced treatments, and 24×7 emergency services.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/appointments">
              <Button size="lg" className="flex items-center gap-2">
                Book an Appointment <FaArrowRight />
              </Button>
            </Link>

            <Link to="/packages">
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                Explore Health Packages <FaArrowRight />
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-(--text-secondary)">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏥</span> 50,000+ Patients
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl">👨‍⚕️</span> 200+ Specialists
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl">⭐</span> 4.9 Patient Rating
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
