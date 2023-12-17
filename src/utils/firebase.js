// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAulJ2xsxYGX313TCtAXD4u8GiBDJ7E6sE",
  authDomain: "netflixgpt-13827.firebaseapp.com",
  projectId: "netflixgpt-13827",
  storageBucket: "netflixgpt-13827.appspot.com",
  messagingSenderId: "212605116514",
  appId: "1:212605116514:web:2ecc47ba9d7e1bd14c313b",
  measurementId: "G-L2VZEFN1ZP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
