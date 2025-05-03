// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import Firestore functions

const firebaseConfig = {
  apiKey: "AIzaSyAXnjA-n6aOQqtI7m9crtcxTKO_69qaJA4",
  authDomain: "leadzen-58aed.firebaseapp.com",
  projectId: "leadzen-58aed",
  storageBucket: "leadzen-58aed.appspot.com",
  messagingSenderId: "905837375815",
  appId: "1:905837375815:web:d68edd206fadd5b8279c62",
  measurementId: "G-7HE8QZN9G1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Export Firebase auth and Firestore methods
export { auth, db, collection, addDoc };
