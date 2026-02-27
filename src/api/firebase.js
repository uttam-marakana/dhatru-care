// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7VSPNme6wtOJeYm5INFKWiGCOpD0kH4g",
  authDomain: "dhatru-care.firebaseapp.com",
  projectId: "dhatru-care",
  storageBucket: "dhatru-care.firebasestorage.app",
  messagingSenderId: "45470272373",
  appId: "1:45470272373:web:26e7faeaaae3b5c15fa13c",
  measurementId: "G-YM8N36PFW6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
