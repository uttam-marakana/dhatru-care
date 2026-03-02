import { lazy, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));
const Button = lazy(() => import("../../components/common/Button"));

const ITEMS_PER_PAGE = 12;

export default function DoctorsList({
  doctors = [],
  loading = false,
  error = null,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  /* ===============================
     PAGINATION
  ================================= */
  const totalPages = Math.ceil(doctors.length / ITEMS_PER_PAGE);

  const paginatedDoctors = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return doctors.slice(start, start + ITEMS_PER_PAGE);
  }, [doctors, currentPage]);

  /* Reset page if doctors change */
  useMemo(() => {
    setCurrentPage(1);
  }, [doctors]);

  /* ===============================
     LOADING STATE
  ================================= */
  if (loading) {
    return (
      <Container className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="aspect-square bg-gray-200 dark:bg-gray-800" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    );
  }

  /* ===============================
     ERROR STATE
  ================================= */
  if (error) {
    return (
      <Container className="py-20 text-center">
        <p className="text-red-600 text-lg">{error}</p>
      </Container>
    );
  }

  /* ===============================
     EMPTY STATE
  ================================= */
  if (doctors.length === 0) {
    return (
      <Container className="py-20 text-center">
        <h3 className="text-2xl font-semibold mb-3">No Doctors Found</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters.
        </p>
      </Container>
    );
  }

  /* ===============================
     MAIN UI
  ================================= */
  return (
    <Container className="py-12">
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedDoctors.map((doctor) => (
          <Link
            key={doctor.id}
            to={`/doctors/${doctor.id}`}
            className="block group h-full"
          >
            <Card hover className="h-full flex flex-col overflow-hidden">
              {/* IMAGE */}
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {doctor.imageUrl ? (
                  <img
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-7xl">🩺</span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col grow">
                <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition">
                  {doctor.name}
                </h3>

                <p className="text-primary font-medium mt-1">
                  {doctor.specialty}
                </p>

                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <span>{doctor.experience}</span>
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    {doctor.rating || 4.8}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-2 grow">
                  {doctor.bio || "Experienced specialist."}
                </p>

                <Button
                  variant="outline"
                  className="mt-5 w-full group-hover:bg-primary group-hover:text-white transition"
                >
                  View Profile & Book
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-4 mt-12">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            ← Previous
          </Button>

          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next →
          </Button>
        </div>
      )}
    </Container>
  );
}
