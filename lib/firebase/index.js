// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCll1TSK7VPJ6S-Uiqzm8omXFiC3qN0t9c",
  authDomain: "smart-finance-6f7f6.firebaseapp.com",
  projectId: "smart-finance-6f7f6",
  storageBucket: "smart-finance-6f7f6.appspot.com",
  messagingSenderId: "37934644653",
  appId: "1:37934644653:web:0c281cae352ad00fbb3524"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
