import { Suspense } from "react";
import Loader from "./Loader";

export default function LazyWrapper({ children }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-10">
          <Loader size="lg" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
