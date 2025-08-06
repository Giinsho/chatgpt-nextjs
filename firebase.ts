import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7ZcilQBlvxkOCR0D52slVlRo0tfCIeWE",
  authDomain: "chatgpt-mess-dea01.firebaseapp.com",
  projectId: "chatgpt-mess-dea01",
  storageBucket: "chatgpt-mess-dea01.firebasestorage.app",
  messagingSenderId: "48682637150",
  appId: "1:48682637150:web:0482da68627e62985e21cf",
  measurementId: "G-XEBCLHJW7F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
