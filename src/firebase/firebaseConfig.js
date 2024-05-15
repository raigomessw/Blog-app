// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvKcTUuCN-2dncdXsAhM-7H5GRD-jN1q0",
  authDomain: "blog-app-83162.firebaseapp.com",
  projectId: "blog-app-83162",
  storageBucket: "blog-app-83162.appspot.com",
  messagingSenderId: "704403549974",
  appId: "1:704403549974:web:e1415056aeacef454aaa37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };