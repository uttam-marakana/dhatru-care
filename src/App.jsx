import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";

import Loader from "./components/common/Loader";
import AppRoutes from "./routes/AppRoutes";

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
        <AppRoutes />
      </Suspense>
    </div>
  );
}

export default App;
