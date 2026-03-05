import { useState, lazy, useMemo } from "react";

const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));
const Button = lazy(() => import("../../components/common/Button"));

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

  const parsePrice = (price = "") => Number(price.replace(/[^\d]/g, "")) || 0;

  const recommendedPackage = useMemo(() => {
    if (!packages.length) return null;

    let best = null;
    let bestScore = -1;

    packages.forEach((pkg) => {
      const price = parsePrice(pkg.price);
      const tests = pkg.includes?.length || 0;

      let score = 0;

      if (answers.goal === "preventive") score += tests;
      if (answers.goal === "advanced") score += tests * 1.5;

      if (
        answers.goal === "senior" &&
        pkg.name?.toLowerCase().includes("senior")
      )
        score += 5;

      if (answers.budget === "low" && price <= 2000) score += 3;
      if (answers.budget === "medium" && price <= 5000) score += 3;
      if (answers.budget === "high") score += 2;

      if (answers.age === "50+" && tests > 4) score += 3;

      if (score > bestScore) {
        bestScore = score;
        best = pkg;
      }
    });

    return best;
  }, [answers, packages]);

  const handleFinish = () => {
    if (recommendedPackage && onRecommendation) {
      onRecommendation(recommendedPackage);
    }
  };

  const optionStyle = (active) => `     w-full
    border border-(--border)
    rounded-lg
    p-3
    text-(--text)
    bg-(--surface)
    hover:border-(--color-primary)
    transition
    ${active ? "border-(--color-primary)" : ""}
  `;

  return (
    <section className="py-12 md:py-20">
      {" "}
      <Container>
        {" "}
        <Card
          className="
       max-w-2xl mx-auto
       p-6 md:p-8
       bg-(--card)
       border border-(--border)
       shadow-[0_0_40px_var(--glow-soft)]
     "
        >
          {" "}
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-(--text)">
            Find Your Best Health Package{" "}
          </h2>
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-(--text)">Select Age Group</h3>

              {["18-30", "30-50", "50+"].map((age) => (
                <button
                  key={age}
                  onClick={() => {
                    setAnswers((p) => ({ ...p, age }));
                    setStep(2);
                  }}
                  className={optionStyle(answers.age === age)}
                >
                  {age}
                </button>
              ))}
            </div>
          )}
          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-(--text)">Health Goal</h3>

              {[
                { key: "preventive", label: "Preventive Checkup" },
                { key: "advanced", label: "Advanced Full Body" },
                { key: "senior", label: "Senior Care" },
              ].map((g) => (
                <button
                  key={g.key}
                  onClick={() => {
                    setAnswers((p) => ({ ...p, goal: g.key }));
                    setStep(3);
                  }}
                  className={optionStyle(answers.goal === g.key)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          )}
          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-(--text)">Budget Range</h3>

              {[
                { key: "low", label: "Under ₹2000" },
                { key: "medium", label: "₹2000 – ₹5000" },
                { key: "high", label: "Premium (Any)" },
              ].map((b) => (
                <button
                  key={b.key}
                  onClick={() => setAnswers((p) => ({ ...p, budget: b.key }))}
                  className={optionStyle(answers.budget === b.key)}
                >
                  {b.label}
                </button>
              ))}

              <Button className="w-full mt-4">Get Recommendation</Button>
            </div>
          )}
          {/* RESULT */}
          {recommendedPackage && step === 3 && (
            <div
              className="
          mt-8
          p-4
          rounded-lg
          bg-(--color-primary)/10
          border border-(--color-primary)
        "
            >
              <h4 className="font-bold text-(--color-primary) mb-2">
                ⭐ Recommended For You
              </h4>

              <p className="font-semibold text-(--text)">
                {recommendedPackage.name}
              </p>

              <p className="text-sm mt-1 text-(--text-secondary)">
                Price: {recommendedPackage.price}
              </p>
            </div>
          )}
        </Card>
      </Container>
    </section>
  );
}
