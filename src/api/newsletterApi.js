import { insertSubscriber } from "../services/newsletterService";

/* --- CREATE ----------- */

export const subscribeNewsletter = (email, source) =>
  insertSubscriber(email, source);
