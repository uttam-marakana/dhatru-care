import { Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import TopBar from "./components/layout/TopBar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Loader from "./components/common/Loader";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();

  // detect admin routes
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      {/* PUBLIC LAYOUT ONLY */}
      {!isAdmin && <TopBar />}
      {!isAdmin && <Header />}

      <main className="grow">
        <Analytics />
        <Suspense
          fallback={
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-950/80">
              <Loader size="lg" />
            </div>
          }
        >
          <AppRoutes />
        </Suspense>
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
