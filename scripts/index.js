import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    setPersistence,
    browserSessionPersistence
 } from 'firebase/auth';
import { EmailAuthCredential } from 'firebase/auth/web-extension';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { auth, handleSignUp, handleSignIn, handleSignOut } from './auth.js'; 
import { onAuthStateChanged } from 'firebase/auth';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const signupButton = document.getElementById('signup-button');
const authStatus = document.getElementById('auth-status');

const firebaseConfig = {
  apiKey: "AIzaSyB4I99PME3SWxEl_qYPkBL7TAmeY02bHSw",
  authDomain: "swlc-9085b.firebaseapp.com",
  projectId: "swlc-9085b",
  storageBucket: "swlc-9085b.firebasestorage.app",
  messagingSenderId: "321447612795",
  appId: "1:321447612795:web:fb117bb04e72d3734e2dde"
};

if (signupButton) {
  signupButton.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    handleSignUp(email, password);
  });
}

if (loginButton) {
  loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    handleSignIn(email, password);
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    handleSignOut();
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario conectado:", user.email, user.uid);
    if (authStatus) {
      authStatus.textContent = `Conectado como: ${user.email}`;
    }
  } else {
    console.log("Ningún usuario conectado.");
    if (authStatus) {
      authStatus.textContent = "Desconectado.";
    }
  }
});

