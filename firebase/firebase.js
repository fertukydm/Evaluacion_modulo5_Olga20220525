// firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKjdT9Ra0gH15juaQRlvecBuTulGObX1M",
  authDomain: "practica-firebase-20220525.firebaseapp.com",
  projectId: "practica-firebase-20220525",
  storageBucket: "practica-firebase-20220525.firebasestorage.app",
  messagingSenderId: "487098172603",
  appId: "1:487098172603:web:6b9410e352eabef924959e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
