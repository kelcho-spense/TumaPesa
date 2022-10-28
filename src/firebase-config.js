// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA5OeKry9SyxgSYNlN2D5qviy851XkmS2U",
  authDomain: "mpesaclone.firebaseapp.com",
  projectId: "mpesaclone",
  storageBucket: "mpesaclone.appspot.com",
  messagingSenderId: "62241417071",
  appId: "1:62241417071:web:bfdcd27bff8a66cff26a9a"
};
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);