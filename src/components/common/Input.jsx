import PropTypes from "prop-types";
import { forwardRef } from "react";

const Input = forwardRef(({ className = "", error, ...props }, ref) => {
  return (
    <div className="w-full">
      <input
        ref={ref}
        className={`
          w-full px-4 py-3 rounded-lg border
          bg-white dark:bg-gray-900
          border-gray-300 dark:border-gray-700
          text-gray-900 dark:text-gray-100
          placeholder:text-gray-500 dark:placeholder:text-gray-500
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
          transition-all duration-200
          disabled:opacity-60 disabled:cursor-not-allowed
          ${error ? "border-rose-500 focus:ring-rose-500/50" : ""}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

Input.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
};

export default Input;
