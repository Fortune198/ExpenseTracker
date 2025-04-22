// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBm_yvaXTs3T-6Vp1TFk2wi_fkrul0cXho",
  authDomain: "expense-tracker-7ae73.firebaseapp.com",
  projectId: "expense-tracker-7ae73",
  storageBucket: "expense-tracker-7ae73.firebasestorage.app",
  messagingSenderId: "229560198613",
  appId: "1:229560198613:web:f7f0fd4ff3499a5decc95c",
  measurementId: "G-G1PMCGJ7NB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
// Exporting the auth and provider objects to use them in other files


