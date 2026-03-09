import { lazy } from "react";

/*
Auto import ONLY public pages
*/

const publicPages = import.meta.glob("../pages/public/**/*.jsx");

/*
Convert file path → route path
*/

function getRoutePath(file) {
  let path = file
    .replace("../pages/public", "")
    .replace(".jsx", "")
    .toLowerCase();

  if (path === "/home") return "/";
  if (path.endsWith("/index")) path = path.replace("/index", "");

  return path || "/";
}

export const publicRoutes = Object.entries(publicPages).map(
  ([file, importer]) => {
    const Component = lazy(importer);

    return {
      path: getRoutePath(file),
      element: Component,
    };
  },
);
