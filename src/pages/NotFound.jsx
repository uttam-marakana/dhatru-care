import { Link } from "react-router-dom";
import { lazy } from "react";

const Container = lazy(() => import("../components/layout/Container"));
const Button = lazy(() => import("../components/common/Button"));

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg) py-16 px-4">
      <Container className="text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-[var(--color-primary)] mb-6">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-(--text)">
          Page Not Found
        </h2>

        <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/">
          <Button size="lg">Return to Home</Button>
        </Link>
      </Container>
    </div>
  );
}
