import { useEffect, useState, useRef, lazy } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaSearch,
  FaTimesCircle,
  FaUser,
  FaCog,
  FaCalendarCheck,
  FaSignOutAlt,
} from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Container = lazy(() => import("./Container"));
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

  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  /* AUTH */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return () => unsub();
  }, []);

  /* DARK MODE WATCH */
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

  /* ROUTE CHANGE CLOSE */
  useEffect(() => setIsOpen(false), [location.pathname]);

  /* BODY LOCK */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  /* SEARCH */
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* LOGO */}
            <Link to="/">
              <img
                src={isDarkMode ? dark_logo : light_logo}
                alt="logo"
                className="h-10 sm:h-12"
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden xl:flex gap-8">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* DESKTOP ACTIONS */}
            <div className="hidden xl:flex items-center gap-4">
              {/* SEARCH */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Open search"
              >
                <FaSearch />
              </button>

              {isSearchOpen && (
                <form onSubmit={handleSearch}>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")}>
                      <FaTimesCircle />
                    </button>
                  )}
                </form>
              )}

              {/* USER */}
              {user ? (
                <>
                  <Link to="/profile">
                    <FaUser />
                  </Link>
                  <button onClick={() => signOut(auth)}>
                    <FaSignOutAlt />
                  </button>
                </>
              ) : (
                <Link to="/login">Login</Link>
              )}

              <ThemeToggle />

              <Link
                to="/appointment"
                className="bg-accent text-white px-6 py-3 rounded-full"
              >
                Book Now
              </Link>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsOpen(true)}
              className="xl:hidden"
              aria-label="Open menu"
              aria-expanded={isOpen}
            >
              <FaBars size={20} />
            </button>
          </div>
        </Container>
      </header>

      <MobileDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navItems={navItems}
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isDarkMode={isDarkMode}
        light_logo={light_logo}
        dark_logo={dark_logo}
        ThemeToggle={ThemeToggle}
      />

      <div className="h-16 sm:h-20" />
    </>
  );
}
