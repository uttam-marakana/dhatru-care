import PropTypes from "prop-types";

export default function Card({
  children,
  className = "",
  hover = true,
  padding = "p-6",
  rounded = "rounded-xl",
  shadow = "shadow-md",
  ...props
}) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        ${padding} ${rounded} ${shadow}
        ${hover ? "hover:shadow-lg hover:-translate-y-1 transition-all duration-300" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  padding: PropTypes.string,
  rounded: PropTypes.string,
  shadow: PropTypes.string,
};
