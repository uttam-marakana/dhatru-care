import { Suspense, lazy } from "react";
import { Analytics } from "@vercel/analytics/react";
import { HomeDataProvider } from "./context/HomeDataContext";

// Dynamic imports
const Loader = lazy(() => import("./components/common/Loader"));
const AppRoutes = lazy(() => import("./routes/AppRoutes"));

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Vercel Analytics */}
      <Analytics />

      <Suspense
        fallback={
          <div
            className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-[var(--bg)]/80
            backdrop-blur-md
            "
          >
            <Loader size="lg" />
          </div>
        }
      >
        <HomeDataProvider>
          <AppRoutes />
        </HomeDataProvider>
      </Suspense>
    </div>
  );
}

export default App;
