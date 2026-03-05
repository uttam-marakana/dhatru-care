import UniversalFilters from "../../components/filters/UniversalFilters";

const fields = [
  {
    type: "search",
    key: "search",
    label: "Search Doctor",
    placeholder: "Dr name or specialty...",
  },
  {
    type: "select",
    key: "specialty",
    label: "Specialty",
    options: [
      { value: "", label: "All Specialties" },
      { value: "cardiology", label: "Cardiology" },
      { value: "neurology", label: "Neurology" },
      { value: "orthopedics", label: "Orthopedics" },
    ],
  },
  {
    type: "select",
    key: "experience",
    label: "Experience",
    options: [
      { value: "", label: "Any Experience" },
      { value: "5+", label: "5+ Years" },
      { value: "10+", label: "10+ Years" },
      { value: "15+", label: "15+ Years" },
    ],
  },
];

export default function DoctorFilters(props) {
  return <UniversalFilters fields={fields} {...props} />;
}
