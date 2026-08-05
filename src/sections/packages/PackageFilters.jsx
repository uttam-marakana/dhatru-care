import UniversalFilters from "../../components/filters/UniversalFilters";

const schema = [
  {
    type: "search",
    key: "search",
    label: "Search Packages",
    placeholder: "Search by package name...",
  },
  {
    type: "select",
    key: "priceRange",
    label: "Price Range",
    options: [
      { value: "", label: "All Prices" },
      { value: "0-3000", label: "Under ₹3,000" },
      { value: "3000-5000", label: "₹3,000 – ₹5,000" },
      { value: "5000-7000", label: "₹5,000 – ₹7,000" },
      { value: "7000+", label: "Above ₹7,000" },
    ],
  },
];

export default function PackageFilters(props) {
  return <UniversalFilters schema={schema} {...props} />;
}
