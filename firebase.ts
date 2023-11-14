// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getFunctions } from "firebase/functions"

const firebaseConfig = {
  apiKey: "AIzaSyDWZWGgSERZHlXC-Fn4QfCUqytyZhVgEdE",
  authDomain: "omni-lingual-app.firebaseapp.com",
  projectId: "omni-lingual-app",
  storageBucket: "omni-lingual-app.appspot.com",
  messagingSenderId: "977733252605",
  appId: "1:977733252605:web:f2a67e03620c06bf7ed594"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const functions = getFunctions(app)

export { db, functions, auth }