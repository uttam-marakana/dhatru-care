import { format, parseISO, isToday, isYesterday } from "date-fns";

export const formatDate = (dateString, pattern = "dd MMM yyyy") => {
  if (!dateString) return "";
  try {
    const date =
      typeof dateString === "string" ? parseISO(dateString) : dateString;
    return format(date, pattern);
  } catch {
    return dateString;
  }
};

export const formatDateRelative = (dateString) => {
  if (!dateString) return "";
  const date = parseISO(dateString);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";

  return format(date, "dd MMM yyyy");
};

export const formatTime = (dateString) => {
  if (!dateString) return "";
  return format(parseISO(dateString), "hh:mm a");
};
