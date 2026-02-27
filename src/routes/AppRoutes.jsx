import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Search from "../pages/Search";
import Departments from "../pages/Departments";
import DepartmentDetail from "../pages/DepartmentDetail";
import Doctors from "../pages/Doctors";
import DoctorDetail from "../pages/DoctorDetail";
import Packages from "../pages/Packages";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import Contact from "../pages/Contact";
import Services from "../pages/Services";

// Optional: 404 page or redirect
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Search page */}
      <Route path="/search" element={<Search />} />
      {/* Main pages */}
      <Route path="/" element={<Home />} />
      {/* Departments */}
      <Route path="/departments" element={<Departments />} />
      <Route path="/departments/:slug" element={<DepartmentDetail />} />
      {/* Doctors */}
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetail />} />
      {/* Packages & Services */}
      <Route path="/packages" element={<Packages />} />
      <Route path="/services" element={<Services />} />
      {/* Blog */}
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      {/* Contact & others */}
      <Route path="/contact" element={<Contact />} />
      {/* Catch-all / 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
