import { Link } from "react-router-dom";
import { prefetchRoute } from "../../utils/prefetchRoutes";

export default function PrefetchLink({ to, children, ...props }) {
  const handlePrefetch = () => {
    prefetchRoute(to);
  };

  return (
    <Link
      to={to}
      onMouseEnter={handlePrefetch}
      onTouchStart={handlePrefetch}
      {...props}
    >
      {children}
    </Link>
  );
}
