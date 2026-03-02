import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

export default function Breadcrumb({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav className="border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-2 py-3 text-sm">
          {items.map((item, i) => {
            const last = i === items.length - 1;

            return (
              <li key={i} className="flex items-center gap-2">
                {!last ? (
                  <>
                    <Link
                      to={item.path}
                      className="text-gray-600 hover:text-primary"
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
