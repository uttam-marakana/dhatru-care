import { useState } from "react";
import { createDoctor } from "../../api/doctorsApi";

const initialState = {
  name: "",
  specialty: "",
  qualification: "",
  experience: "",
  rating: "",
  reviews: "",
  languages: "",
  availability: "",
  location: "",
  bio: "",
  achievements: "",
  imageUrl: "",
};

export default function DoctorForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const normalizeArray = (v) =>
    v
      ? v
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean)
      : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        rating: Number(form.rating) || 0,
        reviews: Number(form.reviews) || 0,
        languages: normalizeArray(form.languages),
        achievements: normalizeArray(form.achievements),
      };

      if (!payload.name || !payload.specialty)
        throw new Error("Required fields missing");

      await createDoctor(payload);
      alert("Doctor added successfully!");
      setForm(initialState);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
    setLoading(false);
  };

  const input = "w-full border rounded-lg p-3";

  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow border p-8">
        <h2 className="text-2xl font-bold mb-6">Add Doctor</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {[
            "name",
            "specialty",
            "qualification",
            "experience",
            "rating",
            "reviews",
            "languages",
            "availability",
            "location",
            "imageUrl",
          ].map((f) => (
            <input
              key={f}
              name={f}
              value={form[f]}
              onChange={handleChange}
              placeholder={f}
              className={input}
            />
          ))}

          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Bio"
            className={`md:col-span-2 ${input}`}
            rows={4}
          />

          <input
            name="achievements"
            value={form.achievements}
            onChange={handleChange}
            placeholder="Achievement1, Achievement2"
            className={`md:col-span-2 ${input}`}
          />

          <button
            disabled={loading}
            className="md:col-span-2 bg-primary text-white py-3 rounded-lg"
          >
            {loading ? "Uploading..." : "Add Doctor"}
          </button>
        </form>
      </div>
    </div>
  );
}
