import PropTypes from "prop-types";

export default function Loader({ size = "md", className = "" }) {
  const sizes = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          animate-spin
          rounded-full
          border-4 border-current border-t-transparent
          text-[var(--color-primary)]
          ${sizes[size] || sizes.md}
        `}
      />
    </div>
  );
}

Loader.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
};
