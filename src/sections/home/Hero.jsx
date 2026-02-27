import Container from "../../components/layout/Container";
import Button from "../../components/common/Button";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center bg-linear-to-br from-primary/10 via-white to-secondary/10 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Optional subtle background pattern or image */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--color-primary),transparent_50%)]/15" />
      </div>

      <Container className="relative z-10 py-16 md:py-24">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white mb-6 animate-fade-in-up">
            Your Health,
            <br className="hidden sm:block" />
            <span className="text-primary">Our Priority</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl leading-relaxed">
            Premium multispeciality hospital in Gondal offering compassionate
            care, advanced treatments and 24×7 emergency services.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Button size="lg" leftIcon={<FaArrowRight />}>
              Book Appointment Now
            </Button>

            <Button variant="secondary" size="lg">
              View Health Packages
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap gap-8 text-sm md:text-base text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏥</span> <span>50,000+ Patients</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">👨‍⚕️</span> <span>200+ Specialists</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>{" "}
              <span>4.9 Patient Rating</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
