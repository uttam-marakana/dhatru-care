import { useState } from "react";
import { createAppointment } from "../api/appointmentsApi";

export const useBookingEngine = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const book = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const id = await createAppointment(payload);

      return { success: true, id };
    } catch (err) {
      const message = err?.message || "Booking failed";
      setError(message);

      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { book, loading, error };
};
