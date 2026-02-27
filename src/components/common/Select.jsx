import PropTypes from "prop-types";
import { forwardRef } from "react";

const Select = forwardRef(
  ({ className = "", error, children, ...props }, ref) => {
    return (
      <div className="w-full">
        <select
          ref={ref}
          className={`
          w-full px-4 py-3 rounded-lg border
          bg-white dark:bg-gray-900
          border-gray-300 dark:border-gray-700
          text-gray-900 dark:text-gray-100
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
          transition-all duration-200
          appearance-none
          bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExIDFMNiA2TDEgMSIgc3Ryb2tlPSIjNkI3MjgwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-no-repeat bg-right-4 bg-center
          disabled:opacity-60 disabled:cursor-not-allowed
          ${error ? "border-rose-500 focus:ring-rose-500/50" : ""}
          ${className}
        `}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

Select.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Select;
