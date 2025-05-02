import * as dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, Timestamp, where } from 'firebase/firestore';

dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU1zICpLJ0g6953gU0FiKqZPlOAMz606o",
  authDomain: "fidoo-tech.firebaseapp.com",
  projectId: "fidoo-tech",
  storageBucket: "fidoo-tech.firebasestorage.app",
  messagingSenderId: "912064289308",
  appId: "1:912064289308:web:1775140eb09d775077ddd9"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db, collection, addDoc, query, orderBy, onSnapshot, Timestamp, where };

