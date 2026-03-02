import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

export default function Breadcrumb({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center flex-wrap gap-2 py-3 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-2">
                {!isLast ? (
                  <>
                    <Link
                      to={item.path}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                    <FaChevronRight className="text-xs text-gray-400" />
                  </>
                ) : (
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
