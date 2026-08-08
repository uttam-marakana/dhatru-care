import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PrefetchLink from '../common/PrefetchLink';

import {
  FaBars,
  FaSearch,
  FaTimesCircle,
  FaUser,
  FaSignOutAlt,
  FaCalendarCheck,
} from 'react-icons/fa';

import { useAuth } from '../../context/AuthContext';
import Container from './Container';

import useUniversalSearch from '../../hooks/useUniversalSearch';
import UniversalSearchDropdown from '../common/UniversalSearchDropdown.jsx';

const ThemeToggle = lazy(() => import('../common/ThemeToggle'));
const MobileDrawer = lazy(() => import('./MobileDrawer'));

import light_logo from '../../assets/images/light_logo.png';
import dark_logo from '../../assets/images/dark_logo.png';

const navItems = [
  { to: '/departments', label: 'Departments' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/packages', label: 'Packages' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  // Drawer
  const [isOpen, setIsOpen] = useState(false);

  // Search
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);

  // User menu
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const userMenuRef = useRef(null);

  const { results, loading } = useUniversalSearch(searchQuery);

  /*
   * Detect theme changes.
   */
  useEffect(() => {
    const updateTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    updateTheme();

    return () => observer.disconnect();
  }, []);

  /*
   * Close overlays when route changes.
   */
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
    setSearchQuery('');
    setActiveIndex(-1);
  }, [location.pathname]);

  /*
   * Search submit.
   */
  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);

    setSearchQuery('');
    setIsSearchOpen(false);
    setActiveIndex(-1);
  };

  /*
   * Search keyboard navigation.
   */
  const handleKeyDown = (e) => {
    if (!results.doctors.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      setActiveIndex((prev) => (prev < results.doctors.length - 1 ? prev + 1 : 0));
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();

      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.doctors.length - 1));
    }

    if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();

      navigate(`/doctors/${results.doctors[activeIndex].id}`);

      setIsSearchOpen(false);
      setSearchQuery('');
      setActiveIndex(-1);
    }
  };

  /*
   * Open mobile drawer.
   */
  const openMobileDrawer = () => {
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
    setIsOpen(true);
  };

  /*
   * Close mobile drawer.
   */
  const closeMobileDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header
        className="
          relative z-30
          border-b border-[var(--border)]
          bg-[var(--surface)]/95
          shadow-md
          backdrop-blur-xl
        "
      >
        <Container className="px-4 sm:px-6 lg:px-10">
          <div
            className="
              flex items-center justify-between
              h-18 sm:h-20 lg:h-24
            "
          >
            <PrefetchLink to="/" className="flex shrink-0 items-center">
              <img
                src={isDarkMode ? dark_logo : light_logo}
                alt="Dhatru Care"
                className="h-10 w-auto sm:h-12 lg:h-16"
              />
            </PrefetchLink>

            <nav
              className="
                hidden lg:flex
                items-center
                gap-6 xl:gap-10
                text-[15px]
                font-medium
              "
              aria-label="Primary navigation"
            >
              {navItems.map((item) => (
                <PrefetchLink
                  key={item.to}
                  to={item.to}
                  className="
                    whitespace-nowrap
                    transition
                    hover:text-[var(--color-primary)]
                  "
                >
                  {item.label}
                </PrefetchLink>
              ))}
            </nav>

            <div
              className="
                hidden lg:flex
                items-center
                gap-4 xl:gap-6
              "
            >
              {/* SEARCH */}
              <div ref={searchRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsSearchOpen((prev) => !prev)}
                  aria-label="Search"
                  aria-expanded={isSearchOpen}
                  className="flex text-lg"
                >
                  <FaSearch />
                </button>

                {isSearchOpen && (
                  <div className="absolute right-0 top-full z-50 mt-4 w-80">
                    <form
                      onSubmit={handleSearch}
                      className="
                        rounded-xl
                        border border-[var(--border)]
                        bg-[var(--card)]
                        p-3
                        shadow-xl
                      "
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
                          className="
                            w-full
                            bg-transparent
                            outline-none
                          "
                          autoFocus
                        />

                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery('');
                              setActiveIndex(-1);
                            }}
                            aria-label="Clear search"
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
                    type="button"
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    aria-label="Account menu"
                    aria-expanded={isUserMenuOpen}
                    className="flex items-center gap-2"
                  >
                    <FaUser />
                  </button>

                  {isUserMenuOpen && (
                    <div
                      className="
                        absolute right-0 z-50 mt-3 w-64
                        overflow-hidden
                        rounded-xl
                        border border-[var(--border)]
                        bg-[var(--card)]
                        shadow-xl
                      "
                    >
                      <PrefetchLink
                        to="/profile"
                        className="
                          block px-5 py-3
                          transition
                          hover:bg-[var(--surface)]
                        "
                      >
                        Profile
                      </PrefetchLink>

                      <PrefetchLink
                        to="/profile/appointments"
                        className="
                          block px-5 py-3
                          transition
                          hover:bg-[var(--surface)]
                        "
                      >
                        My Appointments
                      </PrefetchLink>

                      <PrefetchLink
                        to="/settings"
                        className="
                          block px-5 py-3
                          transition
                          hover:bg-[var(--surface)]
                        "
                      >
                        Settings
                      </PrefetchLink>

                      <div className="border-t border-[var(--border)]" />

                      <button
                        type="button"
                        onClick={logout}
                        className="
                          flex w-full items-center gap-2
                          px-5 py-3
                          text-red-500
                          transition
                          hover:bg-[var(--surface)]
                        "
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <PrefetchLink
                  to="/login"
                  className="
                    flex items-center gap-2
                    text-lg font-medium
                  "
                  aria-label="Login"
                >
                  <FaUser />
                </PrefetchLink>
              )}

              {/* THEME */}
              <Suspense fallback={null}>
                <ThemeToggle />
              </Suspense>

              {/* APPOINTMENT */}
              <PrefetchLink
                to="/appointments"
                className="
                  flex items-center gap-1.5
                  whitespace-nowrap
                  rounded-full
                  bg-[var(--color-primary)]
                  px-4 xl:px-6
                  py-3
                  text-sm font-medium
                  text-white
                "
              >
                <FaCalendarCheck className="text-lg" />
                Book Appointment
              </PrefetchLink>
            </div>

            <div
              className="
                flex items-center gap-5
                lg:hidden
              "
            >
              <button
                type="button"
                onClick={() => setIsSearchOpen((prev) => !prev)}
                aria-label="Search"
                aria-expanded={isSearchOpen}
                className="text-lg"
              >
                <FaSearch />
              </button>

              <button
                type="button"
                onClick={openMobileDrawer}
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                className="text-lg"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </Container>

        {isSearchOpen && (
          <div ref={mobileSearchRef} className="px-6 pb-4 lg:hidden">
            <form
              onSubmit={handleSearch}
              className="
                w-full
                rounded-xl
                border border-[var(--border)]
                bg-[var(--card)]
                p-3
                shadow-lg
              "
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
                  className="
                    w-full
                    bg-transparent
                    outline-none
                  "
                  autoFocus
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveIndex(-1);
                    }}
                    aria-label="Clear search"
                  >
                    <FaTimesCircle />
                  </button>
                )}
              </div>

              <UniversalSearchDropdown
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
          onClose={closeMobileDrawer}
          user={user}
          isDarkMode={isDarkMode}
          light_logo={light_logo}
          dark_logo={dark_logo}
        />
      </Suspense>
    </>
  );
}
