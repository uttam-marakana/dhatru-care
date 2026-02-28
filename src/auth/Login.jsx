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

      if (res.user.email === ADMIN_EMAIL) {
        nav("/admin/upload");
      } else {
        nav("/");
      }
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border dark:border-gray-700 bg-white dark:bg-gray-900 p-3 rounded"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border dark:border-gray-700 bg-white dark:bg-gray-900 p-3 rounded"
        />

        <button className="w-full bg-primary text-white p-3 rounded">
          Login
        </button>

        <p className="text-sm text-center">
          Not registered?{" "}
          <Link to="/signup" className="text-primary">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}
