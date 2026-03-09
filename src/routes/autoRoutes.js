import { lazy } from "react";

/* ----- Automatically import all pages inside /pages
Vite converts them into lazy modules ------------------------- */

const pages = import.meta.glob("../pages/**/*.jsx");

/*
Convert file paths into routes
Example:
../pages/Home.jsx -> /
../pages/Doctors.jsx -> /doctors
../pages/blog/BlogDetail.jsx -> /blog/blogdetail
*/

function getRoutePath(file) {
  let path = file.replace("../pages", "").replace(".jsx", "").toLowerCase();

  if (path === "/home") return "/";
  if (path.endsWith("/index")) path = path.replace("/index", "");

  return path || "/";
}

export const autoRoutes = Object.entries(pages).map(([file, importer]) => {
  const Component = lazy(importer);

  return {
    path: getRoutePath(file),
    element: Component,
  };
});
