import { useTheme } from "../../context/ThemeContext";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();

  const getIcon = () => {
    if (theme === "light") return <FaSun className="w-5 h-5 text-yellow-500" />;
    if (theme === "dark") return <FaMoon className="w-5 h-5 text-indigo-300" />;
    return <FaDesktop className="w-5 h-5 text-gray-500 dark:text-gray-400" />;
  };

  return (
    <button
      onClick={cycleTheme}
      className={`
        relative p-2.5 rounded-full
        bg-gray-100 dark:bg-gray-800
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        focus:ring-offset-white dark:focus:ring-offset-gray-900
      `}
      aria-label="Toggle theme"
      title={`Current: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`}
    >
      <div
        className={`
          inline-block transform transition-all duration-500 ease-in-out
          ${theme === "dark" ? "rotate-180 scale-110" : "rotate-0 scale-100"}
        `}
      >
        {getIcon()}
      </div>
    </button>
  );
}
