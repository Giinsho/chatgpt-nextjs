import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7GMFSRAllo2wbvqNp1DwbtmfajFWYLVI",
  authDomain: "chatgpt-messenger-38ef3.firebaseapp.com",
  projectId: "chatgpt-messenger-38ef3",
  storageBucket: "chatgpt-messenger-38ef3.firebasestorage.app",
  messagingSenderId: "324849361639",
  appId: "1:324849361639:web:3a9677b74268378880f842",
  measurementId: "G-F9FE9540Q1"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export {db, analytics};
