import { lazy } from "react";

const TopBar = lazy(() => import("../components/layout/TopBar"));
const Header = lazy(() => import("../components/layout/Header"));
const Footer = lazy(() => import("../components/layout/Footer"));

import AnimatedOutlet from "../components/common/AnimatedOutlet";

import FloatingAppointmentButton from "../components/common/FloatingAppointmentButton";


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
        <AnimatedOutlet />
        <FloatingAppointmentButton />
      </main>

      <Footer />
    </div>
  );
}
