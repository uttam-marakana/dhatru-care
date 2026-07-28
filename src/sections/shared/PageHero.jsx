import PropTypes from "prop-types";
import Container from "../../components/layout/Container";

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
  bgClass = "bg-[var(--bg)]",
  textColor = "text-white",
  height = "h-[350px] md:h-[450px] lg:h-[550px]",
  children,
}) {
  return (
    <section className={`relative overflow-hidden ${height}`}>
      {/* Background Image */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Optional Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-175 bg-[var(--glow-bg)] blur-[150px] rounded-full z-0"></div>

      <Container className="relative z-10 h-full">
        <div className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto">
          <h1
            className={`
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl
              font-extrabold mb-6
              ${textColor}
            `}
          >
            {title}
          </h1>

          {subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-white/90">
              {subtitle}
            </p>
          )}

          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

PageHero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  backgroundImage: PropTypes.string,
  bgClass: PropTypes.string,
  textColor: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.node,
};