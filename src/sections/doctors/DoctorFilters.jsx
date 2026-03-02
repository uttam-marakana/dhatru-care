import { useState, useEffect, lazy } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { FaSearch } from "react-icons/fa";

const Input = lazy(() => import("../../components/common/Input"));
const CustomSelect = lazy(() => import("../../components/common/CustomSelect"));

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

  /* STABLE EFFECT */
  useEffect(() => {
    if (!onFilterChange) return;

    onFilterChange({
      search: debouncedSearch,
      specialty,
      experience,
    });
  }, [debouncedSearch, specialty, experience]);

  return (
    <div className="w-full space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1.5">
          Search Doctor
        </label>

        <div className="relative">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Dr. name, specialty, keyword..."
            className="pl-10 w-full"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Specialty</label>
          <CustomSelect
            value={specialty}
            options={specialties}
            onChange={setSpecialty}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Experience</label>
          <CustomSelect
            value={experience}
            options={experienceLevels}
            onChange={setExperience}
          />
        </div>
      </div>
    </div>
  );
}
