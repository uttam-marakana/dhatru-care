import { useState } from "react";
import { signup } from "./authApi";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      nav("/login");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Signup</h2>

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
          Signup
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
