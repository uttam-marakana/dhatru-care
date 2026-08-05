import UniversalFilters from "../../components/filters/UniversalFilters";

const fields = [
  {
    type: "search",
    key: "search",
    label: "Search Departments",
    placeholder: "Search by name or specialty...",
  },
  {
    type: "select",
    key: "category",
    label: "Category",
    options: [
      { value: "", label: "All Categories" },
      { value: "cardiology", label: "Cardiology" },
      { value: "neurology", label: "Neurology" },
      { value: "orthopedics", label: "Orthopedics" },
      { value: "dermatology", label: "Dermatology" },
      { value: "pediatrics", label: "Pediatrics" },
      { value: "gynecology", label: "Gynecology" },
      { value: "urology", label: "Urology" },
      { value: "ophthalmology", label: "Ophthalmology" },
      { value: "psychiatry", label: "Psychiatry" },
      { value: "ent", label: "ENT" },
      { value: "general-medicine", label: "General Medicine" },
      { value: "radiology", label: "Radiology & Imaging" },
      { value: "emergency", label: "Emergency & Trauma Care" },
    ],
  },
];

export default function DepartmentFilters(props) {
  return <UniversalFilters schema={fields} {...props} />;
}
