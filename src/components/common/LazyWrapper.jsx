import { Suspense } from "react";
import PropTypes from "prop-types";
import Loader from "./Loader";
import PageTransition from "./PageTransition";

export default function LazyWrapper({ children }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-10">
          <Loader size="lg" />
        </div>
      }
    >
      <PageTransition>{children}</PageTransition>
    </Suspense>
  );
}

LazyWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
