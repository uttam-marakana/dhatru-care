import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import doctors from "../data/doctors.json";
// import departments from "../data/departments.json";
// import packages from "../data/packages.json";
// import blogs from "../data/blog_posts.json";

const uploadCollection = async (name, data) => {
  console.log("Uploading:", name);

  for (const item of data) {
    await addDoc(collection(db, name), {
      ...item,
      createdAt: serverTimestamp(),
    });
  }

  console.log(name, "Uploaded Successfully...");
};

export const runBulkUpload = async () => {
  try {
    await uploadCollection("doctors", doctors);
    // await uploadCollection("departments", departments);
    // await uploadCollection("packages", packages);
    // await uploadCollection("blog_posts", blogs);
  } catch (err) {
    console.error(err);
    alert("Upload failed");
  }
};
