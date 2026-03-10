import { lazy } from "react";
import PropTypes from "prop-types";

import Container from "../../components/layout/Container";

export default function PageHero({
  title,
  subtitle,
  bgClass = "bg-[var(--bg)]",
  textColor = "text-[var(--text)]",
  height = "py-16 md:py-24 lg:py-32",
  children,
}) {
  return (
    <section className={`relative overflow-hidden ${bgClass} ${height}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-175 bg-[var(--glow-bg)] blur-[150px] rounded-full"></div>

      <Container>
        <div className="text-center max-w-4xl mx-auto relative z-10">
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
            <p
              className="
              text-lg md:text-xl lg:text-2xl
              max-w-3xl mx-auto
              text-[var(--text-secondary)]
              "
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
