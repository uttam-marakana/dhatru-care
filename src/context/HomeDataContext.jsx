import { createContext, useContext, useEffect, useState } from "react";
import { getDoctors } from "../api/doctorsApi";
import { getAllDepartments } from "../api/departmentsApi";
import { getPackages } from "../api/packagesApi";
import { getBlogPosts } from "../api/blogsApi";
import { useAuth } from "./AuthContext";

const HomeDataContext = createContext();

export function HomeDataProvider({ children }) {
  const { tenantId } = useAuth();

  const [data, setData] = useState({
    departments: [],
    doctors: [],
    packages: [],
    blogs: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenantId) return;

    const loadAll = async () => {
      try {
        const [dept, docs, pkgs, posts] = await Promise.all([
          getAllDepartments({}, tenantId),
          getDoctors(tenantId),
          getPackages(tenantId),
          getBlogPosts(tenantId),
        ]);

        setData({
          departments: dept,
          doctors: docs,
          packages: pkgs,
          blogs: posts,
        });
      } catch (err) {
        console.error("GLOBAL HOME LOAD ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, [tenantId]);

  return (
    <HomeDataContext.Provider value={{ ...data, loading }}>
      {children}
    </HomeDataContext.Provider>
  );
}

export function useHomeData() {
  return useContext(HomeDataContext);
}
