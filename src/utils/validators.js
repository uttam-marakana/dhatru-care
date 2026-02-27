import * as Yup from "yup";

export const phoneValidation = Yup.string()
  .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
  .required("Phone number is required");

export const emailValidation = Yup.string()
  .email("Please enter a valid email")
  .required("Email is required");

export const nameValidation = Yup.string()
  .min(2, "Name is too short")
  .max(50, "Name is too long")
  .required("Name is required");

export const dateNotPast = Yup.date()
  .min(new Date(), "Date cannot be in the past")
  .required("Date is required");

export const appointmentSchema = Yup.object({
  fullName: nameValidation,
  phone: phoneValidation,
  email: emailValidation,
  department: Yup.string().required("Please select department"),
  preferredDate: dateNotPast,
  message: Yup.string().max(500, "Message is too long"),
});

export const contactSchema = Yup.object({
  name: nameValidation,
  email: emailValidation,
  subject: Yup.string().required("Subject is required"),
  message: Yup.string()
    .min(10, "Message is too short")
    .max(1000, "Message is too long")
    .required("Message is required"),
});
