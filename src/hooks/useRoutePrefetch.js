import { useEffect } from "react";
import { routePrefetchMap } from "../utils/prefetchRoutes";

export default function useRoutePrefetch() {
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        Object.values(routePrefetchMap).forEach((loader) => loader());
      });
    }
  }, []);
}
