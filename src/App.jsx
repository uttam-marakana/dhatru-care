// src/App.jsx
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import TopBar from "./components/layout/TopBar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Loader from "./components/common/Loader";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <TopBar />
      <Header />

      <main className="grow">
        <Suspense
          fallback={
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
              <Loader size="lg" />
            </div>
          }
        >
          <AppRoutes />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
