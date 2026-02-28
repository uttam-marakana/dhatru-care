import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";

import Container from "./Container";
import ThemeToggle from "../common/ThemeToggle";
import light_logo from "../../assets/images/light_logo.png";
import dark_logo from "../../assets/images/dark_logo.png";

const navItems = [
  { to: "/departments", label: "Departments" },
  { to: "/doctors", label: "Doctors" },
  { to: "/packages", label: "Packages" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [hasShadow, setHasShadow] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark"),
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();

  /* ---------------- Theme Listener ---------------- */
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  /* ---------------- Scroll Behaviour ---------------- */
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 10;

    const handleScroll = () => {
      if (isOpen || isSearchOpen) return;

      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      setHasShadow(currentScrollY > 20);

      if (currentScrollY < 80) {
        setShowHeader(true);
      } else if (Math.abs(diff) > threshold) {
        setShowHeader(diff < 0);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, isSearchOpen]);

  /* ---------------- Body Scroll Lock ---------------- */
  useEffect(() => {
    if (isOpen || isSearchOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }, [isOpen, isSearchOpen]);

  /* ---------------- ESC Close ---------------- */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  /* ---------------- Outside Click ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  /* ---------------- Search ---------------- */
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          bg-white/95 dark:bg-gray-950/95 backdrop-blur-md
          border-b border-gray-200/80 dark:border-gray-800/80
          transition-all duration-400 ease-in-out
          ${showHeader ? "translate-y-0" : "-translate-y-full"}
          ${hasShadow ? "shadow-lg shadow-black/5 dark:shadow-black/30" : ""}
        `}
      >
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center justify-start py-1 sm:py-2 rounded-lg"
            >
              {!logoError ? (
                <img
                  src={isDarkMode ? dark_logo : light_logo}
                  alt="Dhatru Care Logo"
                  onError={() => setLogoError(true)}
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                />
              ) : (
                <span className="text-primary font-bold text-2xl">
                  Dhatru Care
                </span>
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `font-medium transition-colors hover:text-primary ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-gray-700 dark:text-gray-300"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {isSearchOpen ? (
                    <FaTimes
                      size={16}
                      className="text-gray-600 dark:text-gray-400"
                    />
                  ) : (
                    <FaSearch
                      size={16}
                      className="text-gray-600 dark:text-gray-400"
                    />
                  )}
                </button>

                <div
                  className={`
                    absolute right-0 top-full mt-3 w-80 md:w-96
                    bg-white dark:bg-gray-900 rounded-xl shadow-2xl
                    border border-gray-200 dark:border-gray-800
                    transition-all duration-300
                    ${
                      isSearchOpen
                        ? "opacity-100 scale-100 visible"
                        : "opacity-0 scale-95 invisible pointer-events-none"
                    }
                  `}
                >
                  <form
                    onSubmit={handleSearch}
                    className="relative flex items-center"
                  >
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search doctors, departments, packages..."
                      className="w-full pl-11 pr-10 py-3.5 bg-transparent focus:outline-none"
                    />
                    <FaSearch
                      className="absolute left-4 text-gray-400"
                      size={15}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 text-gray-400"
                      >
                        <FaTimesCircle size={16} />
                      </button>
                    )}
                  </form>
                </div>
              </div>

              {/* User */}
              <Link
                to="/login"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FaUser
                  size={16}
                  className="text-gray-600 dark:text-gray-400"
                />
              </Link>

              {/* Theme */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <ThemeToggle />
              </div>

              {/* CTA */}
              <Link
                to="/appointment"
                className="ml-2 bg-accent text-white px-6 py-3 rounded-full font-medium hover:bg-accent-dark"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </Container>
      </header>

      <div className="h-16 sm:h-20" />
    </>
  );
}
