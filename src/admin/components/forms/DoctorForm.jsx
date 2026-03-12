import { useState } from "react";
import { createDoctor, updateDoctor } from "../../../api/doctorsApi";

const initialState = {
  name: "",
  gender: "",
  specialty: "",
  qualification: "",
  departmentId: "",
  experience: "",
  rating: "",
  reviews: "",
  languages: "",
  location: "",
  bio: "",
  achievements: "",
  imageUrl: "",
  workingDays: "1,2,3,4,5",
  startHour: "",
  endHour: "",
  slotDuration: "",
  leaveDates: "",
};

export default function DoctorForm({ initialData }) {
  const [form, setForm] = useState(
    initialData
      ? {
          ...initialData,
          languages: initialData.languages?.join(", "),
          achievements: initialData.achievements?.join(", "),
          workingDays: initialData.workingDays?.join(", "),
          leaveDates: initialData.leaveDates?.join(", "),
        }
      : initialState,
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toArray = (v) =>
    v
      ? v
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean)
      : [];

  const toNumberArray = (v) =>
    v
      ? v
          .split(",")
          .map((i) => Number(i.trim()))
          .filter(Boolean)
      : [];

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      experience: Number(form.experience) || 0,
      rating: Number(form.rating) || 0,
      reviews: Number(form.reviews) || 0,
      startHour: Number(form.startHour),
      endHour: Number(form.endHour),
      slotDuration: Number(form.slotDuration),
      languages: toArray(form.languages),
      achievements: toArray(form.achievements),
      workingDays: toNumberArray(form.workingDays),
      leaveDates: toArray(form.leaveDates),
    };

    try {
      if (initialData) {
        await updateDoctor(initialData.id, payload);
        alert("Doctor updated");
      } else {
        await createDoctor(payload);
        alert("Doctor created");
        setForm(initialState);
      }
    } catch (err) {
      console.error(err);
      alert("Failed");
    }

    setLoading(false);
  };

  const input =
    "w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--text)]";

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Doctor Name"
        className={input}
        required
      />

      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className={input}
      >
        <option value="">Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <input
        name="specialty"
        value={form.specialty}
        onChange={handleChange}
        placeholder="Specialty"
        className={input}
      />

      <input
        name="qualification"
        value={form.qualification}
        onChange={handleChange}
        placeholder="Qualification"
        className={input}
      />

      <input
        name="departmentId"
        value={form.departmentId}
        onChange={handleChange}
        placeholder="Department ID"
        className={input}
      />

      <input
        name="experience"
        value={form.experience}
        onChange={handleChange}
        placeholder="Experience Years"
        className={input}
      />

      <input
        name="rating"
        value={form.rating}
        onChange={handleChange}
        placeholder="Rating"
        className={input}
      />

      <input
        name="reviews"
        value={form.reviews}
        onChange={handleChange}
        placeholder="Reviews Count"
        className={input}
      />

      <input
        name="languages"
        value={form.languages}
        onChange={handleChange}
        placeholder="Languages (comma separated)"
        className={input}
      />

      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className={input}
      />

      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        className={input}
      />

      <input
        name="workingDays"
        value={form.workingDays}
        onChange={handleChange}
        placeholder="Working Days (1,2,3,4,5)"
        className={input}
      />

      <input
        name="startHour"
        value={form.startHour}
        onChange={handleChange}
        placeholder="Start Hour"
        className={input}
      />

      <input
        name="endHour"
        value={form.endHour}
        onChange={handleChange}
        placeholder="End Hour"
        className={input}
      />

      <input
        name="slotDuration"
        value={form.slotDuration}
        onChange={handleChange}
        placeholder="Slot Duration"
        className={input}
      />

      <input
        name="leaveDates"
        value={form.leaveDates}
        onChange={handleChange}
        placeholder="Leave Dates (YYYY-MM-DD)"
        className={input}
      />

      <textarea
        name="bio"
        value={form.bio}
        onChange={handleChange}
        rows={4}
        className={`${input} md:col-span-2`}
      />

      <input
        name="achievements"
        value={form.achievements}
        onChange={handleChange}
        placeholder="Achievements"
        className={`${input} md:col-span-2`}
      />

      <button disabled={loading} className={`${button} md:col-span-2`}>
        {loading ? "Saving..." : "Save Doctor"}
      </button>
    </form>
  );
}
