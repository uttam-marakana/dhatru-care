import UniversalFilters from "../../components/filters/UniversalFilters";

const fields = [
  {
    type: "search",
    key: "search",
    label: "Search Articles",
    placeholder: "Search articles...",
  },
  {
    type: "select",
    key: "category",
    label: "Category",
    options: [
      { value: "", label: "All Categories" },
      { value: "health-tips", label: "Health Tips" },
      { value: "medical-updates", label: "Medical Updates" },
      { value: "nutrition", label: "Nutrition" },
      { value: "hospital-news", label: "Hospital News" },
    ],
  },
  {
    type: "select",
    key: "sortBy",
    label: "Sort By",
    options: [
      { value: "latest", label: "Latest First" },
      { value: "oldest", label: "Oldest First" },
    ],
  },
];

export default function BlogFilters(props) {
  return <UniversalFilters fields={fields} {...props} />;
}
