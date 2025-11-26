// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB4I99PME3SWxEl_qYPkBL7TAmeY02bHSw",
    authDomain: "swlc-9085b.firebaseapp.com",
    projectId: "swlc-9085b",
    storageBucket: "swlc-9085b.firebasestorage.app",
    messagingSenderId: "321447612795",
    appId: "1:321447612795:web:fb117bb04e72d3734e2dde"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const registerButton = document.getElementById('registerButton');