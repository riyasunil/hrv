// Import the functions you need from the SDKs you need
import { getApps, initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1DdXYwE4hXp5O3ICHRZe_3LsW2i_iuvs",
  authDomain: "hrvp-9de7b.firebaseapp.com",
  projectId: "hrvp-9de7b",
  storageBucket: "hrvp-9de7b.appspot.com",
  messagingSenderId: "939951391718",
  appId: "1:939951391718:web:69c46a3fc77d4e077ecc27"
};


// Initialize Firebase
let app =  initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export default app;
