import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axiosInstance";
import { useState } from "react";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Button from "../common/Button";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string()
    .min(10, "Message is too short")
    .max(1000, "Message is too long")
    .required("Message is required"),
});

export default function ContactForm() {
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setStatus({ loading: true, success: false, error: "" });
    setSubmitting(true);

    try {
      await axiosInstance.post("/contact", {
        ...values,
        source: "website",
        createdAt: new Date().toISOString(),
      });

      setStatus({ loading: false, success: true, error: "" });
      resetForm();
      setTimeout(
        () => setStatus({ loading: false, success: false, error: "" }),
        6000,
      );
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error:
          err.response?.data?.message ||
          "Failed to send message. Try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Get in Touch
      </h2>

      <Formik
        initialValues={{ name: "", email: "", subject: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field name="name" as={Input} placeholder="Your Name" />
              <Field
                name="email"
                as={Input}
                placeholder="Your Email"
                type="email"
              />
            </div>

            <Field name="subject" as={Input} placeholder="Subject" />

            <Field
              name="message"
              as={Textarea}
              placeholder="How can we help you today?"
              rows={6}
            />

            {status.error && (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg text-rose-700 dark:text-rose-300">
                {status.error}
              </div>
            )}

            {status.success && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-700 dark:text-emerald-300 text-center">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting || status.loading}
              loading={isSubmitting || status.loading}
            >
              {status.loading ? "Sending..." : "Send Message"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
