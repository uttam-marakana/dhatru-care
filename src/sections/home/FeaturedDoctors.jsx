import { lazy } from "react";
import { Link } from "react-router-dom";

const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));
const Button = lazy(() => import("../../components/common/Button"));

export default function FeaturedDoctors({ doctors = [], loading }) {
  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.slice(0, 4).map((doctor) => (
            <Link key={doctor.id} to={`/doctors/${doctor.id}`}>
              <Card hover className="text-center overflow-hidden">
                <div className="aspect-square bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-6xl">
                  👨‍⚕️
                </div>

                <div className="p-5">
                  <h3 className="font-bold">{doctor.name}</h3>
                  <p className="text-primary">{doctor.specialty}</p>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    Book Consultation
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
