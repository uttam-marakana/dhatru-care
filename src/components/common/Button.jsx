// src/components/common/Button.jsx
import PropTypes from "prop-types";

const variants = {
  primary: "bg-primary hover:bg-primary-dark text-white shadow-sm",
  secondary:
    "bg-transparent border-2 border-primary text-primary hover:bg-primary/10",
  outline:
    "border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100",
  ghost:
    "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100",
  danger: "bg-rose-600 hover:bg-rose-700 text-white",
  success: "bg-emerald-600 hover:bg-emerald-700 text-white",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-2.5 text-base rounded-xl",
  lg: "px-8 py-3.5 text-lg rounded-xl",
  icon: "p-2.5 rounded-full",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2.5
        font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-950
        disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none
        active:scale-[0.98]
        ${variants[variant] || ""}
        ${sizes[size] || ""}
        ${loading ? "cursor-wait" : ""}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "outline",
    "ghost",
    "danger",
    "success",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg", "icon"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
};
