import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState, lazy } from "react";
import { subscribeNewsletter } from "../../api/newsletterApi";

// Dynamic imports for code splitting
const Input = lazy(() => import("../common/Input"));
const Button = lazy(() => import("../common/Button"));

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
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
      await subscribeNewsletter(values.email, "website-footer");
      setStatus({ loading: false, success: true, error: "" });
      resetForm();
    } catch {
      setStatus({
        loading: false,
        success: false,
        error: "Subscription failed. Try again.",
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
              loading={isSubmitting || status.loading}
            >
              Subscribe
            </Button>
          </Form>
        )}
      </Formik>

      {status.success && <p className="mt-3 text-emerald-600">Subscribed!</p>}
      {status.error && <p className="mt-3 text-rose-600">{status.error}</p>}
    </div>
  );
}
