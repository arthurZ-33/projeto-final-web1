// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYJM6GfI1QHy4WhToWfaSOY6rFCrdnVFw",
  authDomain: "projetofinalprt1.firebaseapp.com",
  databaseURL: "https://projetofinalprt1-default-rtdb.firebaseio.com",
  projectId: "projetofinalprt1",
  storageBucket: "projetofinalprt1.firebasestorage.app",
  messagingSenderId: "165071337354",
  appId: "1:165071337354:web:a2e9c1f75fbc7dce75ba73"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//autenticação
const auth = getAuth(app);

// Inicializa e exporta o Firestore
const db = getFirestore(app);
export { db, app, auth };
