import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { createContactMessage } from "../../api/contactApi";

import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Button from "../common/Button";

const validationSchema = Yup.object({
  name: Yup.string().min(2, "Too short").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid phone")
    .nullable(),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string()
    .min(10, "Message too short")
    .max(1000, "Message too long")
    .required("Message required"),

  website: Yup.string().max(0), // honeypot
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
      /* --- ANTI-SPAM ----------- */
      if (values.website) return;

      if (Date.now() - values.submittedAt < 2000) {
        throw new Error("Spam detected");
      }

      /* --- CLEAN ----------- */
      const cleaned = Object.fromEntries(
        Object.entries(values).map(([k, v]) =>
          typeof v === "string" ? [k, v.trim()] : [k, v],
        ),
      );

      /* --- SUBMIT ----------- */
      await createContactMessage({
        ...cleaned,
        source: "contact-page",
        tenantId: null, //  future SaaS-ready
      });

      setStatus({
        loading: false,
        success: true,
        error: "",
      });

      resetForm();

      /* --- AUTO RESET SUCCESS ----------- */
      setTimeout(() => {
        setStatus((s) => ({ ...s, success: false }));
      }, 3000);
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.message || "Failed to send message. Try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-125 h-125 bg-[var(--glow-bg)] blur-[120px] rounded-full opacity-60" />

      {/* Form */}
      <div className="relative z-10 bg-[var(--card)] border border-[var(--border)] p-6 sm:p-8 rounded-2xl backdrop-blur-md transition-all duration-500 hover:border-[var(--color-primary)]/40 hover:shadow-[0_0_40px_var(--glow-soft)]">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-[var(--heading-gradient-from)] to-[var(--heading-gradient-to)] bg-clip-text text-transparent">
          Get in Touch
        </h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
            website: "",
            submittedAt: Date.now(),
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5 sm:space-y-6">
              <Field name="name" as={Input} placeholder="Your Name" />
              <Field name="email" as={Input} placeholder="Your Email" />
              <Field name="phone" as={Input} placeholder="Phone (optional)" />
              <Field name="subject" as={Input} placeholder="Subject" />
              <Field
                name="message"
                as={Textarea}
                rows={5}
                placeholder="Message"
              />

              <Field name="website" type="hidden" />

              <Button
                type="submit"
                disabled={isSubmitting || status.loading}
                loading={status.loading}
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold py-3 rounded-xl shadow-[0_0_20px_var(--glow-soft)] transition"
              >
                {status.loading ? "Sending..." : "Send Message"}
              </Button>
            </Form>
          )}
        </Formik>

        {status.success && (
          <p className="mt-4 text-[var(--color-success)] text-center text-sm sm:text-base">
            Message sent successfully!
          </p>
        )}

        {status.error && (
          <p className="mt-4 text-[var(--color-error)] text-center text-sm sm:text-base">
            {status.error}
          </p>
        )}
      </div>
    </div>
  );
}
