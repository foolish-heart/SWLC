import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  setPersistence,
  browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4I99PME3SWxEl_qYPkBL7TAmeY02bHSw",
  authDomain: "swlc-9085b.firebaseapp.com",
  projectId: "swlc-9085b",
  storageBucket: "swlc-9085b.firebasestorage.app",
  messagingSenderId: "321447612795",
  appId: "1:321447612795:web:fb117bb04e72d3734e2dde"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

//----------------------------------------------------------------

export function handleSignIn(email, password) {
  setPersistence(auth, browserSessionPersistence)
  .then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  })

  .then((userCredential) => {
    const user = userCredential.user;
    console.log("Inicio de sesión exitoso:", user);
    alert("¡Inicio de sesión exitoso!");
    window.location.href = 'index.html';
  })
      
  .catch((error) => {
    let mensaje = "Error de inicio de sesión.";
    if (errorCode === "auth/user-not-found") mensaje = "Usuario no encontrado.";
    if (errorCode === "auth/wrong-password") mensaje = "Contraseña incorrecta.";
    if (errorCode === "auth/invalid-email") mensaje = "Correo inválido.";
    alert(mensaje);
    console.error(error);
  });
}

export function handleSignUp(email, password) {
  setPersistence(auth, browserSessionPersistence)
  .then(() => {
    return createUserWithEmailAndPassword(auth, email, password);
  })

  .then((userCredential) => {
    const user = userCredential.user;
    console.log("Registro exitoso:", user);
    alert("¡Registro exitoso! Ya estás conectado.");
    window.location.href = 'index.html';
  })

  .catch((error) => {
    const errorCode = error.code;
    let mensaje = "Error de registro.";
    if (errorCode === "auth/email-already-in-use") mensaje = "Este correo ya está registrado.";
    if (errorCode === "auth/weak-password") mensaje = "La contraseña debe tener al menos 6 caracteres.";
    alert(mensaje);
    console.error(error);
  });
}