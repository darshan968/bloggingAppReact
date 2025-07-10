// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-wy8m2AGff57stgDMG73csLoOYOtukRI",
  authDomain: "react-app-e630e.firebaseapp.com",
  projectId: "react-app-e630e",
  storageBucket: "react-app-e630e.firebasestorage.app",
  messagingSenderId: "630911188162",
  appId: "1:630911188162:web:4d6c296cdca494bce5cf5b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db }; // Export the Firestore database instance
