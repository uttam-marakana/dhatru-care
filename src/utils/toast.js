import toast from "react-hot-toast";

export const notifySuccess = (message) => toast.success(message);

export const notifyError = (message) => toast.error(message);

export const notifyLoading = (message) => toast.loading(message);

export const notifyPromise = (promise, messages) =>
  toast.promise(promise, {
    loading: messages.loading || "Processing...",
    success: messages.success || "Success",
    error: messages.error || "Something went wrong",
  });
