import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState, lazy } from "react";
import { subscribeNewsletter } from "../../api/newsletterApi";

const Input = lazy(() => import("../common/Input"));
const Button = lazy(() => import("../common/Button"));

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email required"),
});

export default function NewsletterForm() {
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setStatus({ loading: true, success: false, error: "" });

    try {
      await subscribeNewsletter(values.email.trim(), "website-footer");

      setStatus({ loading: false, success: true, error: "" });
      resetForm();
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error:
          err.message === "Already subscribed"
            ? "You are already subscribed."
            : "Subscription failed. Try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex gap-3">
            <Field name="email" as={Input} placeholder="Your email address" />

            <Button
              type="submit"
              disabled={isSubmitting || status.loading}
              loading={status.loading}
              className="
              bg-[var(--color-main)]
              hover:bg-[var(--color-main-hover)]
              text-white
              shadow-[0_0_15px_var(--glow-soft)]
              "
            >
              Subscribe
            </Button>
          </Form>
        )}
      </Formik>

      {status.success && (
        <p className="mt-3 text-[var(--color-complete)]">
          Subscribed successfully!
        </p>
      )}

      {status.error && (
        <p className="mt-3 text-[var(--color-error)]">{status.error}</p>
      )}
    </div>
  );
}
