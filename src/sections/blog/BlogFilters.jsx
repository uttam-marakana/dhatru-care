import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Container from "../../components/layout/Container";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";

// Demo filter options — in real app these can come from API / constants
const categories = [
  { value: "", label: "All Categories" },
  { value: "health-tips", label: "Health Tips" },
  { value: "patient-stories", label: "Patient Stories" },
  { value: "medical-updates", label: "Medical Updates" },
  { value: "hospital-news", label: "Hospital News" },
  { value: "nutrition", label: "Nutrition & Wellness" },
  { value: "preventive-care", label: "Preventive Care" },
];

const sortOptions = [
  { value: "latest", label: "Latest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "popular", label: "Most Popular" },
];

export default function BlogFilters({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onFilterChange?.({
      search: debouncedSearch.trim(),
      category,
      sortBy,
    });
  }, [debouncedSearch, category, sortBy, onFilterChange]);

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-sm">
      <Container className="py-5">
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          {/* Search input */}
          <div className="flex-1 min-w-0">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Search Articles
            </label>
            <div className="relative">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, topic or keyword..."
                className="pl-10 w-full"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Category */}
          <div className="md:w-64">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Category
            </label>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Sort */}
          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Sort By
            </label>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </Container>
    </div>
  );
}
