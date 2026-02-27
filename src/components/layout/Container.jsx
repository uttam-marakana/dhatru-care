import PropTypes from "prop-types";

export default function Container({
  children,
  className = "",
  as: Component = "div",
  maxWidth = "7xl",
  noPaddingX = false,
  ...props
}) {
  const maxWidths = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    "7xl": "max-w-7xl",
  };

  return (
    <Component
      className={`
        mx-auto w-full
        ${maxWidths[maxWidth] || "max-w-7xl"}
        ${noPaddingX ? "" : "px-4 sm:px-6 lg:px-8"}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.elementType,
  maxWidth: PropTypes.oneOf(["sm", "md", "lg", "xl", "2xl", "7xl"]),
  noPaddingX: PropTypes.bool,
};

Container.displayName = "Container";
