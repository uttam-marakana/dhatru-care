import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Container from "../../components/layout/Container";
import { FaSearch } from "react-icons/fa";

const specialties = [
  { value: "", label: "All Specialties" },
  { value: "cardiology", label: "Cardiology" },
  { value: "neurology", label: "Neurology" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "general", label: "General Medicine" },
];

const experienceLevels = [
  { value: "", label: "Any Experience" },
  { value: "5+", label: "5+ Years" },
  { value: "10+", label: "10+ Years" },
  { value: "15+", label: "15+ Years" },
];

export default function DoctorFilters({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onFilterChange?.({
      search: debouncedSearch,
      specialty,
      experience,
    });
  }, [debouncedSearch, specialty, experience, onFilterChange]);

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-sm">
      <Container className="py-5">
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Search by Name or Keyword
            </label>
            <div className="relative">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Dr. Name, specialty, condition..."
                className="pl-10"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Specialty */}
          <div className="md:w-64">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Specialty
            </label>
            <Select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              {specialties.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Experience */}
          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Experience
            </label>
            <Select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              {experienceLevels.map((opt) => (
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
