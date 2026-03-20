import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const spring = {
    type: "spring",
    stiffness: 120,
    damping: 18,
    mass: 1.2,
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`       
        relative flex 
        items-center 
        w-16 h-8 p-1 
        rounded-full
        overflow-hidden 
        transition-colors 
        duration-700
        backdrop-blur-md
        ${
          isDark
            ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black"
            : "bg-gradient-to-r from-sky-300 via-yellow-200 to-yellow-300"
        }
      `}
    >
      {/* --- SKY / NIGHT GLOW ----------- */}
      {!isDark && (
        <div className="absolute inset-0 bg-yellow-200 opacity-40 blur-xl"></div>
      )}

      {isDark && (
        <div className="absolute inset-0 bg-blue-900 opacity-30 blur-xl"></div>
      )}

      {/* --- MOVING CLOUDS (LIGHT MODE) ----------- */}
      {!isDark && (
        <>
          <motion.span
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute left-2 top-2 w-4 h-2 bg-white/70 rounded-full blur-sm"
          />

          <motion.span
            animate={{ x: [0, -20, 0] }}
            transition={{ duration: 14, repeat: Infinity }}
            className="absolute left-8 bottom-2 w-5 h-2 bg-white/60 rounded-full blur-sm"
          />
        </>
      )}

      {/* --- TWINKLING STARS (DARK MODE) ----------- */}
      {isDark && (
        <>
          <motion.span
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-1 h-1 bg-white rounded-full left-2 top-2"
          />

          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute w-1 h-1 bg-white rounded-full left-6 top-5"
          />

          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute w-1 h-1 bg-white rounded-full left-10 top-3"
          />
        </>
      )}

      {/* --- KNOB ----------- */}
      <motion.div
        className={`
          relative z-10 flex items-center justify-center
          w-6 h-6 rounded-full
          backdrop-blur-md
          ${
            isDark
              ? "bg-gray-700 text-gray-200 shadow-inner"
              : "bg-white text-yellow-500 shadow-md"
          }
       `}
        animate={{
          x: isDark ? 32 : 0,
          rotate: isDark ? 180 : 0,
        }}
        transition={spring}
      >
        {/* --- SUN ----------- */}
        {!isDark && (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <circle cx="12" cy="12" r="4" />

            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />

            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />

            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />

            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </motion.svg>
        )}

        {/* --- MOON ----------- */}
        {isDark && (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="currentColor"
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <path d="M21.64 13A9 9 0 0111 2.36 7 7 0 1012.64 22 9 9 0 0021.64 13z" />
          </motion.svg>
        )}
      </motion.div>
    </button>
  );
}
