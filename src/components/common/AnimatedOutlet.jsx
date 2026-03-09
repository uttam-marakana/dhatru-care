import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export default function AnimatedOutlet() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname}>
        <Outlet />
      </div>
    </AnimatePresence>
  );
}
