import { insertSubscriber } from "../services/newsletterService";

export const subscribeNewsletter = (email, source) =>
  insertSubscriber(email, source);
