import { useEffect, useState, useRef } from "react";

/**
 * useScrollHeader — Custom hook for "Hide on Scroll Down, Show on Scroll Up" behavior.
 *
 * Returns:
 *   isVisible  — Whether the header should be visible (translate-y-0 vs -translate-y-full)
 *   isScrolled — Whether the user has scrolled past the top threshold (for background styling)
 *
 * Performance:
 *   - useRef for lastScrollY — avoids storing scroll position in state, preventing re-render loops
 *   - Passive scroll listener — tells the browser the handler won't call preventDefault(), enabling scroll optimization
 *   - Threshold of 5px — ignores sub-5px scroll deltas (e.g. touchscreen wobble, trackpad hiccups)
 *   - Cleanup on unmount — removes the event listener to prevent memory leaks
 *
 * Edge Cases:
 *   - At top (scrollY <= 10): always visible, not scrolled. Prevents header from hiding when user quickly flicks to top.
 *   - Scrolling down past top: hides header immediately after crossing 10px threshold.
 *   - Scrolling up: shows header immediately.
 *   - Tiny scroll movements (<5px delta): ignored to avoid flickering.
 */
export default function useScrollHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // useRef for lastScrollY: avoids storing in state, which would trigger re-renders on every scroll event.
  // Instead, we mutate the ref directly inside the scroll handler.
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Ignore tiny scroll movements (threshold of 5px) — prevents flickering
      // from micro-movements on touchscreens, trackpads, or inertial scrolling.
      if (Math.abs(currentScrollY - lastScrollY.current) < 5) return;

      // At top of page (scrollY <= 10): always show header with transparent background.
      if (currentScrollY <= 10) {
        setIsVisible(true);
        setIsScrolled(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Scrolled past top → set isScrolled for background styling.
      if (!isScrolled) {
        setIsScrolled(true);
      }

      // Determine direction: scrolling down → hide, scrolling up → show.
      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    // Passive: true — tells the browser the handler will NOT call preventDefault().
    // This allows the browser to optimize scroll performance (no blocking, no jank).
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]); // Only depends on isScrolled (set once when leaving top)

  return { isVisible, isScrolled };
}

