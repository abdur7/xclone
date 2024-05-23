// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-clone-22fe5.firebaseapp.com",
  projectId: "x-clone-22fe5",
  storageBucket: "x-clone-22fe5.appspot.com",
  messagingSenderId: "57856224225",
  appId: "1:57856224225:web:6291420418bdbd44dd00a0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
