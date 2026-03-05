import PropTypes from "prop-types";

const variants = {
  primary:
    "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-[0_0_10px_var(--glow-soft)]",

  secondary:
    "border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10",

  outline:
    "border border-[var(--border)] text-[var(--text)] hover:bg-[var(--card)]",

  ghost: "text-[var(--text)] hover:bg-[var(--card)]",

  danger: "bg-[var(--color-error)] text-white",

  success: "bg-[var(--color-success)] text-white",
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
      focus:outline-none
      focus:ring-2 focus:ring-[var(--color-primary)]
      focus:ring-offset-2 focus:ring-offset-[var(--surface)]
      active:scale-[0.98]
      disabled:opacity-60 disabled:pointer-events-none
      ${variants[variant]}
      ${sizes[size]}
      ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
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
};
