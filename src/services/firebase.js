import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDe8Um0y5gAA8Y1XBzwW7NmQZo9Ega1Z4",
  authDomain: "unify-a59bc.firebaseapp.com",
  projectId: "unify-a59bc",
  storageBucket: "unify-a59bc.firebasestorage.app",
  messagingSenderId: "855932831795",
  appId: "1:855932831795:web:34a195c50e4493d9c4fb46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export auth and db to use in the rest of your app
export const auth = getAuth(app);
export const db = getFirestore(app);