import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { FaStethoscope, FaStar } from "react-icons/fa";

// Static demo data (later replace with real API/Redux/Firestore)
const demoDoctors = [
  {
    id: 1,
    name: "Dr. Rajesh Patel",
    specialty: "Cardiologist",
    experience: "18 years",
    rating: 4.9,
    reviews: 124,
    imagePlaceholder: "❤️",
    shortBio: "Expert in interventional cardiology & heart failure management",
  },
  // ... (add more entries or load from API)
  // For demo we repeat a few
  ...Array(12)
    .fill(0)
    .map((_, i) => ({
      id: i + 5,
      name: `Dr. Example ${i + 1}`,
      specialty: "General Medicine",
      experience: "10 years",
      rating: 4.7,
      reviews: 85,
      imagePlaceholder: "🩺",
      shortBio: "Experienced in preventive care and chronic disease management",
    })),
];

const ITEMS_PER_PAGE = 12;

export default function DoctorsList({ filters = {}, isLoading = false }) {
  const [filteredDoctors, setFilteredDoctors] = useState(demoDoctors);
  const [currentPage, setCurrentPage] = useState(1);

  // Client-side filtering
  useEffect(() => {
    let result = [...demoDoctors];

    // Search
    if (filters.search?.trim()) {
      const term = filters.search.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(term) ||
          d.specialty.toLowerCase().includes(term) ||
          d.shortBio.toLowerCase().includes(term),
      );
    }

    // Specialty
    if (filters.specialty) {
      result = result.filter(
        (d) => d.specialty.toLowerCase() === filters.specialty.toLowerCase(),
      );
    }

    // Experience
    if (filters.experience) {
      const minYears = parseInt(filters.experience, 10);
      if (!isNaN(minYears)) {
        result = result.filter((d) => {
          const years = parseInt(d.experience, 10);
          return !isNaN(years) && years >= minYears;
        });
      }
    }

    setFilteredDoctors(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [filters]);

  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Loading state
  if (isLoading) {
    return (
      <Container className="py-12 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <div className="aspect-square bg-gray-200 dark:bg-gray-800" />
              <div className="p-6 space-y-4">
                <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="flex gap-4">
                  <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    );
  }

  // No results state
  if (filteredDoctors.length === 0) {
    return (
      <Container className="py-20 md:py-32">
        <div className="text-center max-w-lg mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            No Doctors Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            We couldn't find any doctors matching your current filters. Try
            adjusting your search criteria or clear all filters.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.location.reload()} // simple reset for demo
          >
            Reset Filters
          </Button>
        </div>
      </Container>
    );
  }

  // Normal results + pagination
  return (
    <Container className="py-12 md:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {paginatedDoctors.map((doctor) => (
          <Link
            key={doctor.id}
            to={`/doctors/${doctor.id}`}
            className="block group h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
            aria-label={`View profile of ${doctor.name}`}
          >
            <Card hover className="h-full overflow-hidden flex flex-col">
              <div className="aspect-square bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-8xl md:text-9xl">
                {doctor.imagePlaceholder}
              </div>

              <div className="p-5 md:p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                  {doctor.name}
                </h3>
                <p className="text-primary font-medium mb-2">
                  {doctor.specialty}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>{doctor.experience}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    {doctor.rating} ({doctor.reviews})
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2 flex-grow">
                  {doctor.shortBio}
                </p>

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-auto w-full group-hover:bg-primary group-hover:text-white transition-colors"
                >
                  View Profile & Book
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mt-12 md:mt-16">
          <Button
            variant="outline"
            size="md"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
          >
            ← Previous
          </Button>

          <span className="text-sm md:text-base font-medium px-4">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="md"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            aria-label="Next page"
          >
            Next →
          </Button>
        </div>
      )}
    </Container>
  );
}
