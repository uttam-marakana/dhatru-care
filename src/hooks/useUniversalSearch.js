import { useEffect, useState } from "react";

import { getDoctors } from "../api/doctorsApi";
import { getDepartments } from "../api/departmentsApi";
import { getPackages } from "../api/packagesApi";
import { getBlogs } from "../api/blogsApi";

import useDebounce from "../hooks/useDebounce";
import { rankResults } from "../utils/searchRanking";

export default function useUniversalSearch(query) {
  const [results, setResults] = useState({
    doctors: [],
    departments: [],
    packages: [],
    blogs: [],
  });

  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setResults({
        doctors: [],
        departments: [],
        packages: [],
        blogs: [],
      });
      return;
    }

    const fetchResults = async () => {
      setLoading(true);

      try {
        const [doctors, departments, packages, blogs] = await Promise.all([
          getDoctors(),
          getDepartments(),
          getPackages(),
          getBlogs(),
        ]);

        const rankedDoctors = rankResults(doctors, debouncedQuery, [
          "name",
          "specialty",
          "departmentName",
        ]).slice(0, 5);

        const rankedDepartments = rankResults(departments, debouncedQuery, [
          "name",
        ]).slice(0, 4);

        const rankedPackages = rankResults(packages, debouncedQuery, [
          "name",
        ]).slice(0, 4);

        const rankedBlogs = rankResults(blogs, debouncedQuery, ["title"]).slice(
          0,
          4,
        );

        setResults({
          doctors: rankedDoctors,
          departments: rankedDepartments,
          packages: rankedPackages,
          blogs: rankedBlogs,
        });
      } catch (error) {
        console.error("Universal search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return { results, loading };
}
