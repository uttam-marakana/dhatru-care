import { Suspense, lazy } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

import { HomeDataProvider } from "./context/HomeDataContext";

// Dynamic imports
const Loader = lazy(() => import("./components/common/Loader"));
const AppRoutes = lazy(() => import("./routes/AppRoutes"));

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* --- Vercel Analytics ----------- */}
      <Analytics />

      {/* --- GLOBAL TOAST SYSTEM ----------- */}

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--card)",
            color: "var(--text)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "12px 14px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "var(--color-primary)",
              secondary: "#fff",
            },
          },
          error: {
            style: {
              border: "1px solid var(--color-error)",
            },
          },
        }}
      />

      <Suspense
        fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg)]/80 backdrop-blur-md">
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
