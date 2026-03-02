import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState, lazy } from "react";
import { createContactMessage } from "../../api/contactApi";

const Input = lazy(() => import("../common/Input"));
const Textarea = lazy(() => import("../common/Textarea"));
const Button = lazy(() => import("../common/Button"));

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string()
    .min(10, "Message too short")
    .max(1000, "Message too long")
    .required("Message required"),
});

export default function ContactForm() {
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setStatus({ loading: true, success: false, error: "" });

    try {
      const cleaned = Object.fromEntries(
        Object.entries(values).map(([k, v]) => [k, v.trim()]),
      );

      await createContactMessage({
        ...cleaned,
        source: "contact-page",
      });

      setStatus({ loading: false, success: true, error: "" });
      resetForm();
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: "Failed to send message. Try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">Get in Touch</h2>

      <Formik
        initialValues={{ name: "", email: "", subject: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <Field name="name" as={Input} placeholder="Your Name" />
            <Field name="email" as={Input} placeholder="Your Email" />
            <Field name="subject" as={Input} placeholder="Subject" />
            <Field
              name="message"
              as={Textarea}
              rows={6}
              placeholder="Message"
            />

            <Button
              type="submit"
              disabled={isSubmitting || status.loading}
              loading={status.loading}
            >
              {status.loading ? "Sending..." : "Send Message"}
            </Button>
          </Form>
        )}
      </Formik>

      {status.success && (
        <p className="mt-4 text-green-600 text-center">
          Message sent successfully!
        </p>
      )}

      {status.error && (
        <p className="mt-4 text-red-600 text-center">{status.error}</p>
      )}
    </div>
  );
}
