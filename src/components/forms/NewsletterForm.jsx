import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axiosInstance";
import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

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
    setSubmitting(true);

    try {
      await axiosInstance.post("/newsletter/subscribe", {
        email: values.email,
        source: "website-footer",
      });

      setStatus({ loading: false, success: true, error: "" });
      resetForm();
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.response?.data?.message || "Subscription failed. Try again.",
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
          <Form className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Field
                name="email"
                as={Input}
                placeholder="Your email address"
                type="email"
                className="w-full"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-rose-600 dark:text-rose-400 text-sm mt-1.5"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting || status.loading}
              loading={isSubmitting || status.loading}
            >
              Subscribe
            </Button>
          </Form>
        )}
      </Formik>

      {status.success && (
        <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400 text-center">
          Thank you! You've been subscribed.
        </p>
      )}
      {status.error && (
        <p className="mt-3 text-sm text-rose-600 dark:text-rose-400 text-center">
          {status.error}
        </p>
      )}
    </div>
  );
}
