import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For login/register
import { getFirestore } from "firebase/firestore"; // For gas levels
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBIeyj97c-IPyxAXInS4TYG1TFLQtarixc",
  authDomain: "cylinderiq-e9199.firebaseapp.com",
  projectId: "cylinderiq-e9199",
  storageBucket: "cylinderiq-e9199.firebasestorage.app",
  messagingSenderId: "895656022063",
  appId: "1:895656022063:web:abf31190c547a430d476da",
  databaseURL: "https://cylinderiq-e9199-default-rtdb.firebaseio.com/",
};

// If an app already exists, use it. If not, start a new one.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// EXPORT these so we can use them in other files
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);