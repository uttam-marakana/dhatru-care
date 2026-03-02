import { useState, useEffect, lazy } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { FaSearch, FaChevronDown } from "react-icons/fa";

const Input = lazy(() => import("../../components/common/Input"));

export default function BlogFilters({ filters, onFilterChange }) {
  const [search, setSearch] = useState(filters?.search || "");
  const [category, setCategory] = useState(filters?.category || "");
  const [sortBy, setSortBy] = useState(filters?.sortBy || "latest");

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    onFilterChange?.({
      search: debouncedSearch,
      category,
      sortBy,
    });
  }, [debouncedSearch, category, sortBy]);

  return (
    <div className="w-full space-y-4">
      {/* SEARCH */}
      <div>
        <label className="text-sm font-medium mb-1 block">Search</label>

        <div className="relative">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="pl-10 w-full"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* DROPDOWNS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full appearance-none border rounded-lg px-4 pr-10 py-2.5"
          >
            <option value="">All Categories</option>
            <option value="health-tips">Health Tips</option>
            <option value="medical-updates">Medical Updates</option>
            <option value="nutrition">Nutrition</option>
            <option value="hospital-news">Hospital News</option>
          </select>

          <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none border rounded-lg px-4 pr-10 py-2.5"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
