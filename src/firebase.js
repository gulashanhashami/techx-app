
// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import 'firebase/compat/auth';
import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth";
import { getFirestore } from "@firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAnYha1sCm0LSUtUtN4jK_VpwZ1MdFrhEg",
  authDomain: "techx-e7500.firebaseapp.com",
  projectId: "techx-e7500",
  storageBucket: "techx-e7500.appspot.com",
  messagingSenderId: "480045903025",
  appId: "1:480045903025:web:0627b98b5fbabc31f88690"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const authen= getAuth(app);
export const db = getFirestore(app);
export {firebase};
