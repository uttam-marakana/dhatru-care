import { lazy } from "react";
import { Outlet } from "react-router-dom";

// Dynamic imports for code splitting
const TopBar = lazy(() => import("../components/layout/TopBar"));
const Header = lazy(() => import("../components/layout/Header"));
const Footer = lazy(() => import("../components/layout/Footer"));

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <TopBar />
      <Header />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
