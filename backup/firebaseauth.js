import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

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

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    if (messageDiv) {
        messageDiv.style.display = "block";
        messageDiv.innerHTML = message;
        messageDiv.style.opacity = 1;
        setTimeout(function() {
            messageDiv.style.opacity = 0;
        },5000);
    } else {}
}

const signUp = document.getElementById('signupbutton'); 
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;
    const nombres = document.getElementById('Name').value;
    const apellidos = document.getElementById('Apellidos').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
            email: email,
            nombres: nombres,
            apellidos: apellidos
        };

        showMessage('¡Cuenta creada satisfactoriamente!', 'register-message');
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href = 'login.html';
        })

        .catch((error) => {
            console.error("Error de escritura", error);
        });
    })

    .catch((error) => {
        const errorCode = error.code;
        if(errorCode == 'auth/email-already-in-use') {
            showMessage('Correo electronico en uso', 'register-message');
        } else {
            showMessage('No se pudo crear el usuario', 'register-message');
        }
    })
});

const signIn = document.getElementById('loginbutton');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showMessage('Inicio de sesión realizado satisfactoriamente', 'login-message');
        // alert("Inicio de sesión realizado satisfactoriamente");
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'index.html';
    })

    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
            showMessage('Correo o contraseña incorrectos', 'login-message');
            // alert("Correo o contraseña incorrectos");
        } else {
            showMessage('La cuenta no existe', 'login-message');
        }
    })
});