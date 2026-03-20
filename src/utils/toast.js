import toast from "react-hot-toast";

export const notifySuccess = (msg) => toast.success(msg, { icon: "✅" });

export const notifyError = (msg) => toast.error(msg, { icon: "❌" });

export const notifyLoading = (msg) => toast.loading(msg);

export const notifyPromise = (promise, messages) =>
  toast.promise(promise, {
    loading: messages.loading || "Processing...",
    success: messages.success || "Success",
    error: messages.error || "Something went wrong",
  });

export const notifyConflict = () =>
  toast.error("⚠️ Another admin updated this record", {
    duration: 4000,
  });
