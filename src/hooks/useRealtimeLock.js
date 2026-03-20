import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

export const useRealtimeLock = (slotId) => {
  const [lock, setLock] = useState(null);

  useEffect(() => {
    if (!slotId) return;

    const ref = doc(db, "appointmentSlots", slotId);

    return onSnapshot(ref, (snap) => {
      if (!snap.exists()) return;

      const data = snap.data();

      const now = Date.now();

      const expired =
        data.lockedUntil?.toMillis && data.lockedUntil.toMillis() < now;

      setLock({
        isLocked: data.isLocked && !expired,
        lockedBy: data.lockedBy,
      });
    });
  }, [slotId]);

  return lock;
};
