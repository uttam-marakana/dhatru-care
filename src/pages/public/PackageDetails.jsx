import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  FaCheckCircle,
  FaUserMd,
  FaClock,
  FaFileMedical,
  FaHeartbeat,
} from "react-icons/fa";

import { getPackages } from "../../api/packagesApi";
import Container from "../../components/layout/Container";
import Button from "../../components/common/Button";
import Breadcrumb from "../../components/common/Breadcrumb";

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD ---------------- */

  useEffect(() => {
    getPackages().then((data) => {
      const found = data.find((p) => p.id === id);
      setPkg(found || null);
      setLoading(false);
    });
  }, [id]);

  /* ---------------- HELPERS ---------------- */

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") return Number(price.replace(/[^\d]/g, ""));
    return 0;
  };

  const enrichedIncludes = useMemo(() => {
    if (!pkg?.includes) return [];
    return pkg.includes.map((t) => ({
      name: t,
      desc: getTestDescription(t),
    }));
  }, [pkg]);

  /* ---------------- STATES ---------------- */

  if (loading) {
    return (
      <div className="py-24 text-center text-[var(--text-secondary)]">
        Loading package...
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="py-24 text-center text-red-500">Package not found</div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <main className="min-h-screen bg-[var(--bg)] pb-24">
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Packages", path: "/packages" },
          { label: pkg.name },
        ]}
      />

      <Container className="py-10 md:py-16 space-y-12">
        {/* HEADER */}

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">{pkg.name}</h1>

            <p className="text-2xl md:text-3xl text-[var(--color-primary)] mt-3 font-semibold">
              ₹{parsePrice(pkg.price)}
            </p>

            {/* 🔥 URGENCY */}
            <p className="text-sm text-red-500 mt-2 font-medium">
              ⚡ Limited slots available today
            </p>

            {/* 🔥 TRUST */}
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              ✔ 1200+ patients booked • ✔ Doctor verified
            </p>

            <p className="text-[var(--text-secondary)] mt-4 max-w-xl">
              {pkg.description ||
                "Comprehensive preventive health package for early detection and long-term wellness."}
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <Button
                onClick={() =>
                  navigate(
                    `/appointment?package=${pkg.id}&packageName=${pkg.name}`,
                  )
                }
              >
                Book Now
              </Button>
            </div>
          </div>

          {/* QUICK INFO */}

          <div className="grid grid-cols-2 gap-4">
            <InfoCard icon={<FaUserMd />} label="Doctor Consultation" />
            <InfoCard icon={<FaHeartbeat />} label="Preventive Check" />
            <InfoCard icon={<FaClock />} label={pkg.duration || "2–3 hrs"} />
            <InfoCard
              icon={<FaFileMedical />}
              label={pkg.reportTime || "24–48h Reports"}
            />
          </div>
        </div>

        {/* BENEFITS */}

        <div className="grid md:grid-cols-3 gap-6">
          <BenefitCard
            title="Early Detection"
            desc="Identify diseases before symptoms appear."
          />
          <BenefitCard
            title="Cost Saving"
            desc="Prevent expensive treatments later."
          />
          <BenefitCard
            title="Expert Guidance"
            desc="Doctor-reviewed reports and advice."
          />
        </div>

        {/* META */}

        <div className="grid md:grid-cols-3 gap-6">
          <MetaCard
            title="Ideal For"
            value={pkg.target || "Individuals focused on preventive healthcare"}
          />
          <MetaCard title="Duration" value={pkg.duration || "2–3 hours"} />
          <MetaCard
            title="Report Delivery"
            value={pkg.reportTime || "Within 24–48 hours"}
          />
        </div>

        {/* INCLUDED TESTS */}

        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            Tests & Services Included
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrichedIncludes.map((item, i) => (
              <div
                key={i}
                className="
                p-4 rounded-xl
                border border-[var(--border)]
                bg-[var(--card)]
                flex gap-3
                "
              >
                <FaCheckCircle className="text-green-500 mt-1" />

                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL CTA */}

        <div className="text-center pt-10">
          <Button
            size="lg"
            onClick={() =>
              navigate(`/appointment?package=${pkg.id}&packageName=${pkg.name}`)
            }
          >
            Book Your Health Checkup
          </Button>
        </div>
      </Container>

      {/* 🔥 STICKY CTA (MOBILE + DESKTOP SAFE) */}

      <div
        className="
        fixed bottom-0 left-0 w-full
        bg-[var(--card)]
        border-t border-[var(--border)]
        p-4 z-50
        flex items-center justify-between
        "
      >
        <div>
          <p className="text-sm text-[var(--text-secondary)]">Starting from</p>
          <p className="font-bold text-[var(--color-primary)]">
            ₹{parsePrice(pkg.price)}
          </p>
        </div>

        <Button
          onClick={() =>
            navigate(`/appointment?package=${pkg.id}&packageName=${pkg.name}`)
          }
        >
          Book Now
        </Button>
      </div>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

function InfoCard({ icon, label }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
      <div className="text-[var(--color-primary)] text-lg">{icon}</div>
      <span className="text-sm">{label}</span>
    </div>
  );
}

function MetaCard({ title, value }) {
  return (
    <div className="glass p-5 rounded-xl">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm mt-2 text-[var(--text-secondary)]">{value}</p>
    </div>
  );
}

function BenefitCard({ title, desc }) {
  return (
    <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)]">{desc}</p>
    </div>
  );
}

/* ---------------- HELPER ---------------- */

function getTestDescription(test) {
  const map = {
    "Cardiac Screening":
      "Evaluates heart health and detects cardiovascular risks.",
    "Bone Density Test": "Measures bone strength and osteoporosis risk.",
    "Diabetes Screening": "Detects blood sugar levels early.",
    "Vision Check": "Basic eye examination for clarity and issues.",
    "Physician Consultation": "Doctor reviews reports and provides guidance.",
  };

  return map[test] || "Standard diagnostic test included.";
}
