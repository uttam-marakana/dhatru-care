import { Outlet } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

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
