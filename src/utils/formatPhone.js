export const formatPhone = (phone) => {
  if (!phone) return "";

  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");

  // India format: +91 XXXXX XXXXX
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{5})(\d{5})/, "$1 $2");
  }

  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }

  // Fallback: return original
  return phone;
};

export const isValidIndianPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, "");
  return (
    cleaned.length === 10 || (cleaned.length === 12 && cleaned.startsWith("91"))
  );
};
