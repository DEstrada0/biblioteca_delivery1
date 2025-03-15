import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDocs, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAZdKUbdjWjtziPVzODhrdaEBOX9rKSL6U",
    authDomain: "librarya01638657.firebaseapp.com",
    projectId: "librarya01638657",
    storageBucket: "librarya01638657.firebasestorage.app",
    messagingSenderId: "736964779925",
    appId: "1:736964779925:web:da237653a21064646ee09c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Export the services
export { auth, db };
