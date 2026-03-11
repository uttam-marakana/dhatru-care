import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

import {
  FaBars,
  FaSearch,
  FaTimesCircle,
  FaUser,
  FaSignOutAlt,
  FaPhoneAlt,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import Container from "./Container";

import useUniversalSearch from "../../hooks/useUniversalSearch";
import UniversalSearchDropdown from "../common/UniversalSearchDropdown";

const ThemeToggle = lazy(() => import("../common/ThemeToggle"));
const MobileDrawer = lazy(() => import("./MobileDrawer"));

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
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const userMenuRef = useRef(null);

  const { results, loading } = useUniversalSearch(searchQuery);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setIsDarkMode(document.documentElement.classList.contains("dark"));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);

    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!results.doctors.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < results.doctors.length - 1 ? prev + 1 : 0,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : results.doctors.length - 1,
      );
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      navigate(`/doctors/${results.doctors[activeIndex].id}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className="
        fixed top-0 left-0 right-0 z-50
        backdrop-blur-xl
        bg-[var(--surface)]/95
        border-b border-[var(--border)]
        shadow-md
        "
      >
        <Container className="px-6 lg:px-10">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* LOGO */}

            <Link to="/" className="flex items-center">
              <img
                src={isDarkMode ? dark_logo : light_logo}
                alt="Dhatru Care"
                className="h-14 lg:h-16 w-auto"
              />
            </Link>

            {/* NAVIGATION */}

            <nav className="hidden xl:flex items-center gap-10 text-[15px] font-medium">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="hover:text-[var(--color-primary)] transition"
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* DESKTOP ACTIONS */}

            <div className="hidden xl:flex items-center gap-6">
              {/* Emergency */}

              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)]"
              >
                <FaPhoneAlt />
                Emergency
              </a>

              {/* SEARCH */}

              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setIsSearchOpen((p) => !p)}
                  className="text-lg"
                >
                  <FaSearch />
                </button>

                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-4 w-80">
                    <form
                      onSubmit={handleSearch}
                      className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 shadow-xl"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="search"
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setActiveIndex(-1);
                          }}
                          onKeyDown={handleKeyDown}
                          placeholder="Search doctors..."
                          className="w-full bg-transparent outline-none"
                          autoFocus
                        />

                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                          >
                            <FaTimesCircle />
                          </button>
                        )}
                      </div>
                    </form>

                    <UniversalSearchDropdown
                      results={results}
                      query={searchQuery}
                      loading={loading}
                      activeIndex={activeIndex}
                    />
                  </div>
                )}
              </div>

              {/* USER */}

              {user ? (
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen((p) => !p)}
                    className="flex items-center gap-2"
                  >
                    <FaUser />
                    <span className="text-sm">Account</span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-[var(--card)] border rounded-xl shadow-lg">
                      <Link
                        to="/profile"
                        className="block px-4 py-3 hover:bg-[var(--surface)]"
                      >
                        Profile
                      </Link>

                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-3 flex items-center gap-2 text-red-500"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <FaUser />
                  Login
                </Link>
              )}

              <Suspense fallback={null}>
                <ThemeToggle />
              </Suspense>

              <Link
                to="/appointments"
                className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-full text-sm font-medium"
              >
                Book Appointment
              </Link>
            </div>

            {/* MOBILE ACTIONS */}

            <div className="flex items-center gap-5 xl:hidden">
              <button
                onClick={() => setIsSearchOpen((p) => !p)}
                className="text-lg"
              >
                <FaSearch />
              </button>

              <button onClick={() => setIsOpen(true)} className="text-lg">
                <FaBars />
              </button>
            </div>
          </div>
        </Container>

        {/* MOBILE SEARCH */}

        {isSearchOpen && (
          <div ref={mobileSearchRef} className="xl:hidden px-6 pb-4">
            <form
              onSubmit={handleSearch}
              className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setActiveIndex(-1);
                  }}
                  placeholder="Search doctors..."
                  className="w-full bg-transparent outline-none"
                  autoFocus
                />

                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery("")}>
                    <FaTimesCircle />
                  </button>
                )}
              </div>

              <SearchDropdown
                results={results}
                query={searchQuery}
                loading={loading}
                activeIndex={activeIndex}
              />
            </form>
          </div>
        )}
      </header>

      <Suspense fallback={null}>
        <MobileDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          navItems={navItems}
          user={user}
          isDarkMode={isDarkMode}
          light_logo={light_logo}
          dark_logo={dark_logo}
        />
      </Suspense>

      <div className="h-20 lg:h-24" />
    </>
  );
}
