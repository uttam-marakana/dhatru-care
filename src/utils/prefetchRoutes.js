// Prefetch dynamic route chunks

export const routePrefetchMap = {
  "/departments": () => import("../pages/public/Departments"),
  "/doctors": () => import("../pages/public/Doctors"),
  "/packages": () => import("../pages/public/Packages"),
  "/packages/:id": () => import("../pages/public/PackageDetails"),
  "/blog": () => import("../pages/public/Blog"),
  "/contact": () => import("../pages/public/Contact"),
  "/login": () => import("../auth/Login"),
  "/signup": () => import("../auth/Signup"),
};

export function prefetchRoute(path) {
  const loader = routePrefetchMap[path];

  if (loader) {
    loader();
  }
}
