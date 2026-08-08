import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import {
  FaTimes,
  FaPhoneAlt,
  FaSignOutAlt,
  FaChevronDown,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

import PrefetchLink from '../common/PrefetchLink';
import ThemeToggle from '../common/ThemeToggle';

import { useAuth } from '../../context/AuthContext';

const DRAWER_SOCIALS = [FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn];

const NAV_GROUPS = [
  {
    title: 'Explore',
    id: 'explore',
    items: [
      {
        to: '/departments',
        label: 'Departments',
      },
      {
        to: '/doctors',
        label: 'Doctors',
      },
      {
        to: '/packages',
        label: 'Packages',
      },
    ],
  },
  {
    title: 'Resources',
    id: 'resources',
    items: [
      {
        to: '/blog',
        label: 'Blog',
      },
      {
        to: '/contact',
        label: 'Contact',
      },
    ],
  },
];

function NavGroup({ title, id, items, open, onToggle }) {
  return (
    <div className="border-b border-[var(--border)] pb-3">
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={open}
        className="
          flex w-full
          items-center justify-between
          py-3
          text-sm
          font-semibold
          uppercase
          tracking-wider
          text-[var(--muted)]
        "
      >
        <span>{title}</span>

        <FaChevronDown
          size={12}
          className={`
            transition-transform
            duration-300
            ${open ? 'rotate-180' : ''}
          `}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: 'easeInOut',
            }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-2 pt-1">
              {items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onToggle}
                  className={({ isActive }) =>
                    `
                      rounded-lg
                      px-3
                      py-2
                      text-base
                      font-medium
                      transition
                      ${
                        isActive
                          ? `
                            bg-[var(--color-primary)]/10
                            text-[var(--color-primary)]
                          `
                          : `
                            text-[var(--text-secondary)]
                            hover:bg-[var(--surface)]
                            hover:text-[var(--color-primary)]
                          `
                      }
                    `
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

NavGroup.propTypes = {
  title: PropTypes.string.isRequired,

  id: PropTypes.string.isRequired,

  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,

  open: PropTypes.bool.isRequired,

  onToggle: PropTypes.func.isRequired,
};

export default function MobileDrawer({ isOpen, onClose, user, isDarkMode, light_logo, dark_logo }) {
  const { logout } = useAuth();

  const [openGroups, setOpenGroups] = useState(() => new Set(['explore']));

  /*
   * ESC key + body scroll lock
   */
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    /*
     * Prevent the page behind the drawer from scrolling.
     */
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);

      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  /*
   * Accordion toggle
   */
  const toggleGroup = (id) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  /*
   * IMPORTANT:
   *
   * The drawer is rendered directly under <body>.
   *
   * This prevents the header/layout stacking context from
   * interfering with the drawer on tablet/mobile.
   */
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            lg:hidden
          "
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <motion.div
            className="
              absolute
              inset-0
              bg-black/50
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.aside
            className="
              absolute
              right-0
              top-0

              h-dvh

              w-[85%]
              max-w-[420px]

              overflow-y-auto
              overscroll-contain

              border-l
              border-[var(--border)]

              bg-[var(--surface)]
              text-[var(--text)]

              shadow-2xl

              will-change-transform
            "
            initial={{
              x: '100%',
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: '100%',
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
          >
            <div
              className="
                flex
                h-full
                flex-col
                px-6
                py-6
              "
            >
              <div
                className="
                  mb-8
                  flex
                  items-center
                  justify-between
                "
              >
                <PrefetchLink to="/" onClick={onClose} className="shrink-0">
                  <img
                    src={isDarkMode ? dark_logo : light_logo}
                    alt="Dhatru Care"
                    className="h-10 w-auto"
                  />
                </PrefetchLink>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    transition
                    hover:bg-[var(--surface)]
                  "
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <a
                href="tel:+919876543210"
                className="
                  mb-6
                  flex
                  items-center
                  justify-center
                  gap-3

                  rounded-xl

                  bg-[var(--color-primary)]

                  py-3

                  font-semibold
                  text-white
                "
              >
                <FaPhoneAlt />

                <span>24×7 Emergency Call</span>
              </a>

              <nav
                className="
                  flex
                  flex-col
                  text-lg
                  font-medium
                "
                aria-label="Mobile navigation"
              >
                {NAV_GROUPS.map((group) => (
                  <NavGroup
                    key={group.id}
                    {...group}
                    open={openGroups.has(group.id)}
                    onToggle={toggleGroup}
                  />
                ))}
              </nav>

              {/* Push account/footer to bottom when space exists */}
              <div className="flex-1" />

              <div
                className="
                  mb-6
                  border-t
                  border-[var(--border)]
                  pt-6
                "
              >
                {user ? (
                  <div className="flex flex-col gap-4">
                    <NavLink
                      to="/profile"
                      onClick={onClose}
                      className={({ isActive }) =>
                        `
                          transition
                          ${
                            isActive
                              ? 'text-[var(--color-primary)]'
                              : `
                                text-[var(--text-secondary)]
                                hover:text-[var(--color-primary)]
                              `
                          }
                        `
                      }
                    >
                      Profile
                    </NavLink>

                    <NavLink
                      to="/profile/appointments"
                      onClick={onClose}
                      className={({ isActive }) =>
                        `
                          transition
                          ${
                            isActive
                              ? 'text-[var(--color-primary)]'
                              : `
                                text-[var(--text-secondary)]
                                hover:text-[var(--color-primary)]
                              `
                          }
                        `
                      }
                    >
                      My Appointments
                    </NavLink>

                    <NavLink
                      to="/settings"
                      onClick={onClose}
                      className={({ isActive }) =>
                        `
                          transition
                          ${
                            isActive
                              ? 'text-[var(--color-primary)]'
                              : `
                                text-[var(--text-secondary)]
                                hover:text-[var(--color-primary)]
                              `
                          }
                        `
                      }
                    >
                      Settings
                    </NavLink>

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        onClose();
                      }}
                      className="
                        flex
                        items-center
                        gap-2
                        text-left
                        text-red-500
                      "
                    >
                      <FaSignOutAlt />

                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `
                        transition
                        ${
                          isActive
                            ? 'text-[var(--color-primary)]'
                            : `
                              text-[var(--text-secondary)]
                              hover:text-[var(--color-primary)]
                            `
                        }
                      `
                    }
                  >
                    Login
                  </NavLink>
                )}
              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between

                  border-t
                  border-[var(--border)]

                  pt-5
                "
              >
                {/* SOCIALS */}
                <div className="flex items-center gap-3">
                  {DRAWER_SOCIALS.map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      aria-label={`Social link ${index + 1}`}
                      className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center

                          rounded-full

                          border
                          border-[var(--border)]

                          text-[var(--muted)]

                          transition

                          hover:border-[var(--color-primary)]/40
                          hover:text-[var(--color-primary)]
                        "
                    >
                      <Icon size={12} />
                    </a>
                  ))}
                </div>

                {/* THEME */}
                <ThemeToggle />
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

MobileDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,

  onClose: PropTypes.func.isRequired,

  user: PropTypes.object,

  isDarkMode: PropTypes.bool,

  light_logo: PropTypes.string,

  dark_logo: PropTypes.string,
};
