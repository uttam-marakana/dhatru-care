import { useState, useEffect } from "react";

/**
 * Debounce a rapidly changing value
 * Useful for search inputs, filters, API requests
 *
 * @param {any} value - Value to debounce
 * @param {number} delay - Debounce delay (ms)
 * @returns {any} Debounced value
 */
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
