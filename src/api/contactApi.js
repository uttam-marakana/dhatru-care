import {
  insertContactMessage,
  subscribeContactMessages as subscribeService,
  updateMessageMeta,
} from "../services/contactService";

/* --- CREATE ----------- */
export const createContactMessage = async (data) => {
  return insertContactMessage(data);
};

/* --- REALTIME SUBSCRIBE ----------- */
export const subscribeContacts = (cb) => {
  return subscribeService(cb);
};

/* --- UPDATE (STATUS / PRIORITY / NOTES) ----------- */
export const updateContactMeta = async (id, payload) => {
  return updateMessageMeta(id, payload);
};
