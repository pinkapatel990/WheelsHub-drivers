// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCELBBgqHmC03ibNsulmPhR14TFZQzGSDk",
  authDomain: "carrentzone-a26dd.firebaseapp.com",
  projectId: "carrentzone-a26dd",
  storageBucket: "carrentzone-a26dd.appspot.com",
  messagingSenderId: "522181350478",
  appId: "1:522181350478:web:5564348a7bb91207a15f1f",
  measurementId: "G-F03C0DK0SY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)