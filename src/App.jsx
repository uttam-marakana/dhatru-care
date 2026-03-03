import { Suspense,lazy } from "react";
import { Analytics } from "@vercel/analytics/react";
import { HomeDataProvider } from "./context/HomeDataContext";


// Dynamic imports for code splitting
const Loader = lazy(() => import("./components/common/Loader"));
const AppRoutes = lazy(() => import("./routes/AppRoutes"));

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Analytics />

      <Suspense
        fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-950/80">
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
