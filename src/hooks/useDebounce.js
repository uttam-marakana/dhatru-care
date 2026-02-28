import { useState, useEffect } from "react";

/**
 * Custom hook to debounce a rapidly changing value (e.g. search input, filter changes)
 * @param {any} value - Value to debounce
 * @param {number} delay - Time in ms to wait before updating (default 500)
 * @returns {any} The debounced (delayed) value
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel timeout if value changes before delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run only when value or delay changes

  return debouncedValue;
}
