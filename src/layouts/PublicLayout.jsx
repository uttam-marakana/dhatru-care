import { lazy } from "react";
import { Outlet } from "react-router-dom";

const TopBar = lazy(() => import("../components/layout/TopBar"));
const Header = lazy(() => import("../components/layout/Header"));
const Footer = lazy(() => import("../components/layout/Footer"));

export default function PublicLayout() {
  return (
    <div
      className="
      flex min-h-screen flex-col
      bg-[var(--bg)]
      text-[var(--text)]
      "
    >
      <TopBar />

      <Header />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
