/* --- CENTRALIZED PACKAGE → DEPARTMENT MAPPING -----------
 *
 * Maps a health package name to the department IDs of doctors who
 * should be shown/treat that package. This keeps the appointment
 * flow decoupled from hardcoded logic inside components.
 *
 * Department IDs come from src/data/departments.json (via Firestore).
 */

const DEPARTMENT_IDS = {
  cardiology: "YwjJu1WXV2RzwxREC0wr",
  dermatology: "JrdMNsHJ93NJUudvc4dt",
  orthopedics: "FipmmEAunGfLcklWm7uK",
  gynecology: "I1bBSPlMr11mJm3GsSaS",
  neurology: "Ws5F1KahKcvGjrD5UjQG",
  pediatrics: "his328MP4V6UEBa5G18Q",
  urology: "jEVsWPRSEVysf7xIa7GS",
  ophthalmology: "jqoVfAmy6lzHLZSjxmsL",
  psychiatry: "oZY2Xo9Gm5X7CVZi2Ngr",
  ent: "1Y854FNHkG5xwJlWFsMc",
  generalMedicine: "X88C8Cd64Caile8N2bCS",
  radiology: "FbhbP02blnv9IDObOlJq",
  emergency: "lGUcBiVdkPAB65P431NE",
};

export const PACKAGE_DEPARTMENT_IDS = DEPARTMENT_IDS;

/* --- Map package name → list of department IDs ----------- */

export const packageDoctorMap = {
  "Heart Health Package": [DEPARTMENT_IDS.cardiology],
  "Diabetes Care Package": [DEPARTMENT_IDS.generalMedicine],
  "Full Body Checkup": [DEPARTMENT_IDS.generalMedicine],
  "Women Wellness Package": [DEPARTMENT_IDS.gynecology],
  "Senior Citizen Health Package": [DEPARTMENT_IDS.generalMedicine],
  "Kidney Care Package": [DEPARTMENT_IDS.urology],
  "Eye Care Package": [DEPARTMENT_IDS.ophthalmology],
  "Executive Health Package": [
    DEPARTMENT_IDS.generalMedicine,
    DEPARTMENT_IDS.cardiology,
  ],
};

/* --- Helper: get department IDs for a package name ----------- */

export const getDepartmentsForPackage = (packageName) => {
  if (!packageName) return [];

  // Match by exact name first, then case-insensitive substring.
  if (packageDoctorMap[packageName]) {
    return packageDoctorMap[packageName];
  }

  const normalized = packageName.toLowerCase();

  const match = Object.entries(packageDoctorMap).find(([key]) =>
    normalized.includes(key.toLowerCase()),
  );

  return match ? match[1] : [];
};
