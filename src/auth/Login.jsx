import { useState } from "react";
import { login } from "./authApi";
import { useNavigate, Link } from "react-router-dom";

const ADMIN_EMAIL = "uttamrootways@gmail.com";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(email, password);

      if (res.user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        nav("/admin/bulk-upload");
      } else {
        nav("/");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
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
          focus:ring-2 focus:ring-[var(--color-main)]
          focus:border-[var(--color-main)]
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
          focus:ring-2 focus:ring-[var(--color-main)]
          focus:border-[var(--color-main)]
          outline-none
          "
        />

        <button
          className="
          w-full p-3 rounded-lg
          bg-[var(--color-main)]
          hover:bg-[var(--color-main-hover)]
          text-white
          font-semibold
          transition
          shadow-[0_0_15px_var(--glow-soft)]
          "
        >
          Login
        </button>

        <p className="text-sm text-center text-[var(--text-secondary)]">
          Not registered?{" "}
          <Link
            to="/signup"
            className="text-[var(--color-main)] hover:underline"
          >
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}
