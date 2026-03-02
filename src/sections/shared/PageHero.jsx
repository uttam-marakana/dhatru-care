import { lazy } from "react";
import PropTypes from "prop-types";

// Dynamic imports for code splitting
const Container = lazy(() => import("../../components/layout/Container"));

export default function PageHero({
  title,
  subtitle,
  bgClass = "bg-gradient-to-br from-primary/10 to-secondary/10",
  textColor = "text-gray-900 dark:text-white",
  height = "py-16 md:py-24 lg:py-32",
  children,
}) {
  return (
    <section className={`${bgClass} ${height}`}>
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 ${textColor}`}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={`text-lg md:text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto ${textColor}`}
            >
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
  bgClass: PropTypes.string,
  textColor: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.node,
};
