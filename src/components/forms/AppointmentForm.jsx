import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axiosInstance"; // your configured axios
import { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  department: Yup.string().required("Please select a department"),
  preferredDate: Yup.date()
    .min(new Date(), "Date cannot be in the past")
    .required("Preferred date is required"),
  message: Yup.string().max(500, "Message too long (max 500 characters)"),
});

const departments = [
  { value: "", label: "Select Department" },
  { value: "cardiology", label: "Cardiology" },
  { value: "neurology", label: "Neurology" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "general", label: "General Medicine" },
];

export default function AppointmentForm() {
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitStatus({ loading: true, success: false, error: "" });
    setSubmitting(true);

    try {
      const response = await axiosInstance.post("/appointments", {
        ...values,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      if (response.status === 201 || response.status === 200) {
        setSubmitStatus({ loading: false, success: true, error: "" });
        resetForm();
        setTimeout(
          () => setSubmitStatus({ loading: false, success: false, error: "" }),
          5000,
        );
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Failed to book appointment. Please try again.";
      setSubmitStatus({ loading: false, success: false, error: errorMsg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Book an Appointment
      </h2>

      <Formik
        initialValues={{
          fullName: "",
          phone: "",
          email: "",
          department: "",
          preferredDate: "",
          message: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <Field name="fullName" as={Input} placeholder="Full Name" />
            <ErrorMessage
              name="fullName"
              component="p"
              className="text-rose-600 dark:text-rose-400 text-sm mt-1"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field
                name="phone"
                as={Input}
                placeholder="Phone Number"
                type="tel"
              />
              <Field
                name="email"
                as={Input}
                placeholder="Email Address"
                type="email"
              />
            </div>

            <Field name="department" as={Select}>
              {departments.map((dep) => (
                <option key={dep.value} value={dep.value}>
                  {dep.label}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="department"
              component="p"
              className="text-rose-600 dark:text-rose-400 text-sm mt-1"
            />

            <Field
              name="preferredDate"
              as={Input}
              type="date"
              placeholder="Preferred Date"
            />
            <ErrorMessage
              name="preferredDate"
              component="p"
              className="text-rose-600 dark:text-rose-400 text-sm mt-1"
            />

            <Field
              name="message"
              as={Textarea}
              placeholder="Additional information or symptoms (optional)"
            />
            <ErrorMessage
              name="message"
              component="p"
              className="text-rose-600 dark:text-rose-400 text-sm mt-1"
            />

            {submitStatus.error && (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg text-rose-700 dark:text-rose-300 text-center">
                {submitStatus.error}
              </div>
            )}

            {submitStatus.success && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-700 dark:text-emerald-300 text-center">
                Appointment booked successfully! We'll contact you soon.
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting || submitStatus.loading}
              loading={isSubmitting || submitStatus.loading}
            >
              {submitStatus.loading ? "Booking..." : "Confirm Appointment"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
