import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadFile = async (file, path) => {
  const fileRef = ref(storage, path);

  await uploadBytes(fileRef, file);

  return await getDownloadURL(fileRef);
};
