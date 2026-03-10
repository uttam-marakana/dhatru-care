export const doctorFilterSchema = [
  {
    key: "search",
    label: "Search Doctor",
    type: "search",
    placeholder: "Search doctor name or specialty",
  },

  {
    key: "departmentId",
    label: "Department",
    type: "select",
    options: [
      { label: "All Departments", value: "" },
      { label: "Cardiology", value: "YwjJu1WXV2RzwxREC0wr" },
      { label: "Dermatology", value: "JrdMNsHJ93NJUudvc4dt" },
      { label: "Orthopedics", value: "FipmmEAunGfLcklWm7uK" },
      { label: "Gynecology", value: "I1bBSPlMr11mJm3GsSaS" },
      { label: "Neurology", value: "Ws5F1KahKcvGjrD5UjQG" },
      { label: "Pediatrics", value: "his328MP4V6UEBa5G18Q" },
      { label: "Urology", value: "jEVsWPRSEVysf7xIa7GS" },
      { label: "Ophthalmology", value: "jqoVfAmy6lzHLZSjxmsL" },
    ],
  },

  {
    key: "experience",
    label: "Experience",
    type: "select",
    options: [
      { label: "Any Experience", value: "" },
      { label: "1+ Years", value: "1" },
      { label: "3+ Years", value: "3" },
      { label: "5+ Years", value: "5" },
      { label: "8+ Years", value: "8" },
    ],
  },
];
