// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdnW8g8tUrmdY9BkvTIZWaGHJCpUek7ck",
  authDomain: "inventory-497a2.firebaseapp.com",
  projectId: "inventory-497a2",
  storageBucket: "inventory-497a2.appspot.com",
  messagingSenderId: "742304363822",
  appId: "1:742304363822:web:1c1940455856c9fe2276bf",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider()

const analytics = getAnalytics(app);