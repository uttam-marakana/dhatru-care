import { useState, lazy, useMemo } from "react";

import Container from "../../components/layout/Container";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

export default function PackageRecommendationQuiz({
  packages = [],
  onRecommendation,
}) {
  const [step, setStep] = useState(1);

  const [answers, setAnswers] = useState({
    age: "",
    goal: "",
    budget: "",
  });

  const [error, setError] = useState("");

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") return Number(price.replace(/[^\d]/g, ""));
    return 0;
  };

  /* -------- AI SCORING ENGINE -------- */

  const recommendation = useMemo(() => {
    if (!packages.length) return null;

    let best = null;
    let bestScore = -1;
    let reason = [];

    packages.forEach((pkg) => {
      let score = 0;
      let localReason = [];

      const price = parsePrice(pkg.price);
      const tests = pkg.includes?.length || 0;

      if (answers.goal === "preventive") {
        score += tests;
        localReason.push("Good preventive coverage");
      }

      if (answers.goal === "advanced") {
        score += tests * 1.5;
        localReason.push("Advanced test coverage");
      }

      if (answers.budget === "low" && price <= 2000) {
        score += 4;
        localReason.push("Fits your budget");
      }

      if (answers.budget === "medium" && price <= 5000) {
        score += 3;
        localReason.push("Within mid-range budget");
      }

      if (answers.age === "50+" && tests >= 5) {
        score += 4;
        localReason.push("Suitable for senior health checks");
      }

      if (score > bestScore) {
        bestScore = score;
        best = pkg;
        reason = localReason;
      }
    });

    return { pkg: best, reason };
  }, [answers, packages]);

  /* -------- STEP VALIDATION -------- */

  const handleNext = () => {
    let valid = false;

    if (step === 1) valid = answers.age;
    if (step === 2) valid = answers.goal;
    if (step === 3) valid = answers.budget;

    if (!valid) {
      setError("Please select an option to continue.");
      return;
    }

    setError("");
    setStep(step + 1);
  };

  const handleFinish = () => {
    if (recommendation?.pkg) {
      onRecommendation(recommendation.pkg);
    }
  };

  const optionStyle = (active) =>
    `w-full border border-[var(--border)] rounded-lg p-3 transition
    ${active ? "border--[var(--color-primary)]" : "hover:border--[var(--color-primary)]"}`;

  return (
    <section className="py-12">
      <Container>
        <Card className="max-w-xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-center mb-2">
            Find Your Best Health Package
          </h2>

          <p className="text-center text-sm mb-6">Step {step} of 3</p>

          {/* STEP 1 */}

          {step === 1 && (
            <div className="space-y-3">
              {["18-30", "30-50", "50+"].map((age) => (
                <button
                  key={age}
                  onClick={() => setAnswers((p) => ({ ...p, age }))}
                  className={optionStyle(answers.age === age)}
                >
                  {age}
                </button>
              ))}
            </div>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <div className="space-y-3">
              {[
                { key: "preventive", label: "Preventive Checkup" },
                { key: "advanced", label: "Advanced Full Body" },
              ].map((g) => (
                <button
                  key={g.key}
                  onClick={() => setAnswers((p) => ({ ...p, goal: g.key }))}
                  className={optionStyle(answers.goal === g.key)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          )}

          {/* STEP 3 */}

          {step === 3 && (
            <div className="space-y-3">
              {[
                { key: "low", label: "Under ₹2000" },
                { key: "medium", label: "₹2000 – ₹5000" },
                { key: "high", label: "Premium Budget" },
              ].map((b) => (
                <button
                  key={b.key}
                  onClick={() => setAnswers((p) => ({ ...p, budget: b.key }))}
                  className={optionStyle(answers.budget === b.key)}
                >
                  {b.label}
                </button>
              ))}
            </div>
          )}

          {/* ERROR */}

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}

          {/* NAVIGATION */}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button variant="ghost" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}

            {step < 3 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleFinish}>Get Recommendation</Button>
            )}
          </div>

          {/* RESULT */}

          {recommendation?.pkg && step === 3 && (
            <div className="mt-8 p-4 border rounded-lg bg-[var(--color-primary)]/10">
              <h4 className="font-bold mb-2">⭐ Recommended Package</h4>

              <p className="font-semibold">{recommendation.pkg.name}</p>

              <p className="text-sm mb-2">
                Price: ₹{parsePrice(recommendation.pkg.price)}
              </p>

              <ul className="text-sm list-disc ml-4">
                {recommendation.reason.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </Container>
    </section>
  );
}
