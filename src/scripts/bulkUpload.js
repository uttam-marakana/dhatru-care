import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// import JSON files
import doctors from "../data/doctors.json";
import departments from "../data/departments.json";
import packages from "../data/packages.json";
import blogs from "../data/blog_posts.json";

// generic uploader
const uploadCollection = async (name, data) => {
  console.log(`Uploading ${name}...`);

  for (const item of data) {
    await addDoc(collection(db, name), {
      ...item,
      createdAt: serverTimestamp(),
    });
  }

  console.log(`${name} uploaded successfully`);
};

export const runBulkUpload = async () => {
  try {
    await uploadCollection("departments", departments);
    await uploadCollection("doctors", doctors);
    await uploadCollection("packages", packages);
    await uploadCollection("blog_posts", blogs);

    console.log("ALL DATA UPLOADED 🚀");
  } catch (err) {
    console.error("Upload failed:", err);
  }
};
