import { lazy } from "react";
import PropTypes from "prop-types";

const Container = lazy(() => import("../../components/layout/Container"));

export default function PageHero({
  title,
  subtitle,
  bgClass = "bg-gradient-to-br from-primary/10 to-secondary/10 dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-gray-950",
  textColor = "text-gray-900 dark:text-white",
  height = "py-16 md:py-24 lg:py-32",
  children,
}) {
  return (
    <section className={`relative overflow-hidden ${bgClass} ${height}`}>
      {/* Dark Mode Glow (only visible in dark) */}
      <div className="hidden dark:block absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/20 blur-[150px] rounded-full"></div>

      <Container>
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 
            ${textColor}
            dark:bg-gradient-to-r dark:from-blue-400 dark:to-cyan-300 
            dark:bg-clip-text dark:text-transparent`}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={`text-lg md:text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto 
              ${textColor}
              dark:text-gray-400`}
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
