import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaTimesCircle } from "react-icons/fa";
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

  // Theme change listener
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

  // Scroll behavior
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

  // Body scroll lock
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

  // ESC close
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

  // Close search on outside click
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

  // Handle search submit (redirect to /search)
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
          bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800/80
          transition-all duration-400 ease-in-out
          ${showHeader ? "translate-y-0" : "-translate-y-full"}
          ${hasShadow ? "shadow-lg shadow-black/5 dark:shadow-black/30" : ""}
          ${isOpen || isSearchOpen ? "z-10" : "z-50"}
        `}
      >
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center justify-start py-1 sm:py-2 focus:outline-none rounded-lg"
              aria-label="Go to homepage"
            >
              {!logoError ? (
                <img
                  src={isDarkMode ? dark_logo : light_logo}
                  alt="Dhatru Care Logo"
                  onError={() => setLogoError(true)}
                  className="
                    h-10 sm:h-12 md:h-14
                    w-auto
                    object-contain
                    transition-all duration-300
                  "
                />
              ) : (
                <span className="text-primary font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  Dhatru Care
                </span>
              )}
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `font-medium text-base transition-colors hover:text-primary ${
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
            <div className="hidden md:flex items-center gap-5">
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <button
                  className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label={isSearchOpen ? "Close search" : "Open search"}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  {isSearchOpen ? (
                    <FaTimes
                      size={18}
                      className="text-gray-600 dark:text-gray-400"
                    />
                  ) : (
                    <FaSearch
                      size={18}
                      className="text-gray-600 dark:text-gray-400"
                    />
                  )}
                </button>

                {/* Search input */}
                <div
                  className={`
                    absolute right-0 top-full mt-3 w-80 md:w-96 bg-white dark:bg-gray-900 
                    rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800
                    overflow-hidden transition-all duration-300 origin-top-right
                    ${
                      isSearchOpen
                        ? "opacity-100 scale-100 visible translate-y-0"
                        : "opacity-0 scale-95 invisible -translate-y-2 pointer-events-none"
                    }
                  `}
                >
                  <form
                    onSubmit={handleSearch}
                    className="relative flex items-center"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search doctors, departments, packages..."
                      className="
                        w-full pl-11 pr-10 py-3.5 bg-transparent 
                        text-gray-900 dark:text-gray-100 
                        placeholder-gray-500 dark:placeholder-gray-500
                        focus:outline-none text-base
                      "
                      autoFocus={isSearchOpen}
                    />
                    <FaSearch
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        onClick={() => setSearchQuery("")}
                        aria-label="Clear search"
                      >
                        <FaTimesCircle size={18} />
                      </button>
                    )}
                  </form>
                </div>
              </div>

              <ThemeToggle />

              <Link
                to="/appointment"
                className="
                  bg-accent text-white px-6 py-3 rounded-full font-medium text-base
                  hover:bg-accent-dark transition-colors shadow-sm
                "
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </Container>
      </header>

      {/* Spacer */}
      <div
        className={`h-16 sm:h-20 bg-gray-50 dark:bg-gray-950 ${isOpen || isSearchOpen ? "hidden" : "block"}`}
      />

      {/* Mobile Drawer */}
      <div
        className={`
          fixed inset-0 z-50 lg:hidden
          transition-opacity duration-300
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
        `}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />

        <aside
          className={`
            absolute left-0 top-0 h-full w-80 max-w-[85vw]
            bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800
            transform transition-transform duration-400 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-10">
              <Link to="/" onClick={() => setIsOpen(false)}>
                {!logoError ? (
                  <img
                    src={isDarkMode ? dark_logo : light_logo}
                    alt="Dhatru Care Logo"
                    onError={() => setLogoError(true)}
                    className="max-w-[160px] h-10 object-contain"
                  />
                ) : (
                  <span className="text-primary font-bold text-2xl">
                    Dhatru Care
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
                className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <nav
              className="flex flex-col gap-2 flex-grow"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-5 py-4 rounded-xl text-lg font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-gray-200 dark:border-gray-800 flex items-center gap-4">
              <ThemeToggle />
              <Link
                to="/appointment"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-accent text-white text-center py-4 rounded-full font-medium hover:bg-accent-dark transition-colors"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
