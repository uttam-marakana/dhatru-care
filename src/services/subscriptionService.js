import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getTenantSubscription = async (tenantId) => {
  const ref = doc(db, "subscriptions", tenantId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data();
};

export const isSubscriptionActive = (sub) => {
  if (!sub) return false;

  const now = Date.now();
  return sub.status === "active" && sub.validUntil > now;
};
