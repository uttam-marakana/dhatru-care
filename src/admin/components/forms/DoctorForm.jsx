import { useState } from "react";
import { createDoctor, updateDoctor } from "../../../api/doctorsApi";
import { notifyPromise } from "../../../utils/toast";
import Input from "../../../components/common/Input";
import CustomSelect from "../../../components/common/CustomSelect";
import Button from "../../../components/common/Button";
import Textarea from "../../../components/common/Textarea";

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
  startHour: "9",
  endHour: "17",
  slotDuration: "30",
  leaveDates: "",
};

export default function DoctorForm({ initialData, onSaved, onClose }) {
  const [form, setForm] = useState(
    initialData
      ? {
          ...initialData,
          languages: initialData.languages?.join(", ") || "",
          achievements: initialData.achievements?.join(", ") || "",
          workingDays: initialData.workingDays?.join(", ") || "1,2,3,4,5",
          leaveDates: initialData.leaveDates?.join(", ") || "",
        }
      : initialState,
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toArray = (v) =>
    v
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

  const toNumberArray = (v) =>
    v
      .split(",")
      .map((i) => Number(i.trim()))
      .filter(Boolean);

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
        await notifyPromise(updateDoctor(initialData.id, payload), {
          loading: "Updating doctor...",
          success: "Doctor updated successfully",
          error: "Failed to update doctor",
        });
      } else {
        await notifyPromise(createDoctor(payload), {
          loading: "Creating doctor...",
          success: "Doctor created successfully",
          error: "Failed to create doctor",
        });
      }

      onSaved?.();
      onClose?.();
      setForm(initialState);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full";

  return (
    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 space-y-6 animate-fade-in-up">
      <div>
        <label className="block text-sm font-medium mb-3 text-[var(--text-secondary)]">Doctor Name *</label>
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Dr. John Doe"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-3 text-[var(--text-secondary)]">Gender</label>
        <CustomSelect
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
          value={form.gender}
          placeholder="Select gender"
          onChange={(val) => setForm({ ...form, gender: val })}
        />
      </div>

      <Input
        label="Specialty *"
        name="specialty"
        value={form.specialty}
        onChange={handleChange}
        placeholder="Cardiology, Neurology, etc."
        className="lg:col-span-2"
      />

      <Input
        label="Qualification"
        name="qualification"
        value={form.qualification}
        onChange={handleChange}
        placeholder="MBBS, MD, etc."
      />

      <Input
        label="Department"
        name="departmentId"
        value={form.departmentId}
        onChange={handleChange}
        placeholder="dept-cardiology"
      />

      <Input
        label="Experience (years)"
        name="experience"
        type="number"
        value={form.experience}
        onChange={handleChange}
        placeholder="10"
      />

      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Rating"
          name="rating"
          type="number"
          step="0.1"
          value={form.rating}
          onChange={handleChange}
          placeholder="4.8"
        />
        <Input
          label="Reviews"
          name="reviews"
          type="number"
          value={form.reviews}
          onChange={handleChange}
          placeholder="150"
        />
        <Input
          label="Languages"
          name="languages"
          value={form.languages}
          onChange={handleChange}
          placeholder="English, Hindi, Tamil"
        />
      </div>

      <Input
        label="Location"
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Downtown Clinic"
      />

      <Input
        label="Image URL"
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="https://..."
      />

      <div className="lg:col-span-2 space-y-3">
        <label className="block text-sm font-medium text-[var(--text-secondary)]">Working Schedule</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            name="workingDays"
            value={form.workingDays}
            onChange={handleChange}
            placeholder="1,2,3,4,5 (Mon-Fri)"
          />
          <Input
            name="startHour"
            type="number"
            value={form.startHour}
            onChange={handleChange}
            placeholder="9"
          />
          <Input
            name="endHour"
            type="number"
            value={form.endHour}
            onChange={handleChange}
            placeholder="17"
          />
          <Input
            name="slotDuration"
            type="number"
            value={form.slotDuration}
            onChange={handleChange}
            placeholder="30"
          />
        </div>
        <Input
          name="leaveDates"
          value={form.leaveDates}
          onChange={handleChange}
          placeholder="2024-12-25,2025-01-01"
        />
      </div>

      <div className="lg:col-span-2">
        <label className="block text-sm font-medium mb-3 text-[var(--text-secondary)]">Bio</label>
        <Textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={4}
          placeholder="Doctor bio..."
        />
      </div>

      <Input
        label="Achievements"
        name="achievements"
        value={form.achievements}
        onChange={handleChange}
        placeholder="Awards, publications (comma separated)"
        className="lg:col-span-2"
      />

      <div className="lg:col-span-2 flex gap-3 pt-4">
        <Button type="submit" loading={loading} className="flex-1">
          {loading ? "Saving..." : initialData ? "Update Doctor" : "Create Doctor"}
        </Button>
        {onClose && (
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
