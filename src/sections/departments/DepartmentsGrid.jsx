import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { lazy } from "react";

// Dynamic imports for code splitting
const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));
const Button = lazy(() => import("../../components/common/Button"));


// Static demo data — in real app this would come from Redux / Firebase / API
const departmentsData = [
  {
    slug: "cardiology",
    name: "Cardiology",
    icon: "❤️",
    shortDesc: "Heart & vascular care – diagnosis, treatment & prevention",
    doctorsCount: 8,
    bgColor: "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30",
  },
  {
    slug: "neurology",
    name: "Neurology",
    icon: "🧠",
    shortDesc: "Brain, spine & nervous system disorders",
    doctorsCount: 6,
    bgColor:
      "from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30",
  },
  {
    slug: "orthopedics",
    name: "Orthopedics",
    icon: "🦴",
    shortDesc: "Bones, joints, muscles & sports injuries",
    doctorsCount: 7,
    bgColor:
      "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30",
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    icon: "👶",
    shortDesc: "Child health, growth & development care",
    doctorsCount: 5,
    bgColor:
      "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
  },
  {
    slug: "general-medicine",
    name: "General Medicine",
    icon: "🩺",
    shortDesc: "Comprehensive adult primary care & chronic disease management",
    doctorsCount: 12,
    bgColor:
      "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
  },
  {
    slug: "gynecology-obstetrics",
    name: "Gynecology & Obstetrics",
    icon: "🤰",
    shortDesc: "Women’s health, pregnancy & childbirth",
    doctorsCount: 6,
    bgColor:
      "from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30",
  },
  {
    slug: "dermatology",
    name: "Dermatology",
    icon: "🧴",
    shortDesc: "Skin, hair & nail conditions",
    doctorsCount: 4,
    bgColor:
      "from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30",
  },
  {
    slug: "ent",
    name: "ENT (Otorhinolaryngology)",
    icon: "👂",
    shortDesc: "Ear, nose, throat & head-neck disorders",
    doctorsCount: 5,
    bgColor:
      "from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30",
  },
];

export default function DepartmentsGrid({ limit = 0, showAllLink = true }) {
  const displayedDepartments =
    limit > 0 ? departmentsData.slice(0, limit) : departmentsData;

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {displayedDepartments.map((dept) => (
          <Link
            key={dept.slug}
            to={`/departments/${dept.slug}`}
            className="block group h-full"
          >
            <Card
              hover
              className={`
                h-full flex flex-col overflow-hidden
                bg-linear-to-br ${dept.bgColor}
                dark:bg-linear-to-br dark:${dept.bgColor}
                border border-transparent group-hover:border-primary/30
                transition-all duration-300
              `}
            >
              <div className="p-8 md:p-10 text-center flex-1 flex flex-col items-center justify-center">
                <div className="text-6xl md:text-8xl mb-6 opacity-90 group-hover:opacity-100 transition-opacity">
                  {dept.icon}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {dept.name}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mb-6 text-base md:text-lg">
                  {dept.shortDesc}
                </p>

                <div className="mt-auto">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {dept.doctorsCount} Specialist
                    {dept.doctorsCount !== 1 ? "s" : ""}
                  </p>

                  <Button
                    variant="ghost"
                    size="sm"
                    rightIcon={
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    }
                    className="group-hover:text-primary"
                  >
                    Explore Department
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {showAllLink && limit > 0 && limit < departmentsData.length && (
        <div className="text-center mt-12 md:mt-16">
          <Button size="lg" variant="outline">
            View All Departments →
          </Button>
        </div>
      )}
    </Container>
  );
}
