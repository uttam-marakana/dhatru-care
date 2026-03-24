import {
  insertContactMessage,
  subscribeContactMessages as subscribeService,
  updateMessageMeta,
} from "../services/contactService";

/* CREATE */
export const createContactMessage = async (data) => {
  return insertContactMessage(data);
};

/* REALTIME */
export const subscribeContacts = (cb) => {
  return subscribeService(cb);
};

/* UPDATE */
export const updateContactMeta = async (id, payload) => {
  return updateMessageMeta(id, payload);
};
