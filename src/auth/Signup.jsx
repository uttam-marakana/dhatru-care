import { useState } from "react";
import { signup } from "./authApi";
import { useNavigate, Link } from "react-router-dom";

import { notifyError } from "../utils/toast";

export default function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    phone: "",
    dob: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      notifyError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await signup(form);

      notifySuccess("Registration successful. Please login.");

      navigate("/login");
    } catch (err) {
      console.error(err);
      notifyError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4 py-10">
      <form
        onSubmit={submit}
        className="
        w-full max-w-lg
        bg-[var(--surface)]
        border border-[var(--border)]
        rounded-2xl
        p-8
        space-y-4
        shadow-[0_0_25px_var(--glow-soft)]
        "
      >
        <h2 className="text-2xl font-bold text-center text-[var(--text)]">
          Patient Registration
        </h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full p-3 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)]"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          className="w-full p-3 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)]"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full p-3 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)]"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)]"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)]"
        />

        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          rows="2"
          className="w-full p-3 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)]"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full p-3 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)]"
        />

        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="w-full p-3 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)]"
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
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[var(--color-primary)] hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
