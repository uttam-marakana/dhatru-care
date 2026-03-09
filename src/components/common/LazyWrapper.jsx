import { lazy, Suspense } from "react";
import PageTransition from "./PageTransition";

const Loader = lazy(() => import("./Loader"));

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
