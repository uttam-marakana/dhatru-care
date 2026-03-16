import { useState } from "react";
import { login } from "./authApi";
import { useNavigate, Link } from "react-router-dom";

import { notifyError } from "../utils/toast";

const ADMIN_EMAIL = "uttamrootways@gmail.com";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const user = await login(email, password);

      if (user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        nav("/admin/bulk-upload");
      } else {
        nav("/");
      }
    } catch (err) {
      console.error(err);
      notifyError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <form
        onSubmit={submit}
        className="
        w-full max-w-md
        bg-[var(--surface)]
        border border-[var(--border)]
        rounded-2xl
        p-8
        space-y-5
        shadow-[0_0_25px_var(--glow-soft)]
        "
      >
        <h2 className="text-2xl font-bold text-center text-[var(--text)]">
          Login
        </h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
          className="
          w-full p-3 rounded-lg
          bg-[var(--card)]
          border border-[var(--border)]
          text-[var(--text)]
          placeholder:text-[var(--muted)]
          focus:ring-2 focus:ring-[var(--color-primary)]
          focus:border-[var(--color-primary)]
          outline-none
          "
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="
          w-full p-3 rounded-lg
          bg-[var(--card)]
          border border-[var(--border)]
          text-[var(--text)]
          placeholder:text-[var(--muted)]
          focus:ring-2 focus:ring-[var(--color-primary)]
          focus:border-[var(--color-primary)]
          outline-none
          "
        />

        <button
          disabled={loading}
          className="
          w-full p-3 rounded-lg
          bg-[var(--color-primary)]
          hover:bg-[var(--color-primary-hover)]
          text-white
          font-semibold
          transition
          shadow-[0_0_15px_var(--glow-soft)]
          disabled:opacity-50
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-[var(--text-secondary)]">
          Not registered?{" "}
          <Link
            to="/signup"
            className="text-[var(--color-primary)] hover:underline"
          >
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}
