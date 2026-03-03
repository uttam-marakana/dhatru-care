import { createContext, useContext, useEffect, useState } from "react";
import { getDoctors } from "../api/doctorsApi";
import { getAllDepartments } from "../api/departmentsApi";
import { getPackages } from "../api/packagesApi";
import { getBlogPosts } from "../api/blogsApi";

const HomeDataContext = createContext();

export function HomeDataProvider({ children }) {
  const [data, setData] = useState({
    departments: [],
    doctors: [],
    packages: [],
    blogs: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [dept, docs, pkgs, posts] = await Promise.all([
          getAllDepartments(),
          getDoctors(),
          getPackages(),
          getBlogPosts(),
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
  }, []);

  return (
    <HomeDataContext.Provider value={{ ...data, loading }}>
      {children}
    </HomeDataContext.Provider>
  );
}

export function useHomeData() {
  return useContext(HomeDataContext);
}
