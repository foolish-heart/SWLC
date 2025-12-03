import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

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
const auth = getAuth();

//Login button

const authContainer = document.getElementById("authContainer");
const btnTramites = document.getElementById("bttn");
const btnTramites1 = document.getElementById("bttn2");

onAuthStateChanged(auth, (user) => {
    if (user) {
        mostrarIcon(user);
        activarBotones(user);
    } else {
        mostrarLogin();
        desactivarBotones();
    }
});

function mostrarLogin() {
    authContainer.innerHTML = `<button onclick="window.location.href='login.html'" class="login">Iniciar Sesión</button>`;
}

function mostrarIcon(user) {
    authContainer.innerHTML = `<span class="material-symbols-outlined user-icon" id="userIcon" onclick="window.location.href='account.html'">
                                account_circle
                                </span>`;
}

function activarBotones() {
    btnTramites.onclick = () => {
        window.location.href = "nuevo-tramite.html"; 
    };

    btnTramites1.onclick = () => {
        window.location.href = "verificarTram.html"; 
    };
}

function desactivarBotones() {
    btnTramites.onclick = () => {
        alert("Debes iniciar sesión para iniciar un trámite.");
    };

    btnTramites1.onclick = () => {
        alert("Debes iniciar sesión para verificar un trámite.");
    };
}

document.getElementById("userIcon").addEventListener("click", () => {
    window.location.href = "cuenta.html";
});
