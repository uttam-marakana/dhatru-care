import PropTypes from "prop-types";

const sizes = {
  sm: "h-5 w-5",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

export default function Loader({
  size = "md",
  className = "",
  color = "text-primary",
}) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          animate-spin rounded-full border-4 border-current border-t-transparent
          ${sizes[size]} ${color} ${className}
        `}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

Loader.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  className: PropTypes.string,
  color: PropTypes.string,
};
