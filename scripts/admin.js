import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, getDoc, doc, collection } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

const adminEmail = "admin@gmail.com";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    } 

    if (user.email.toLowerCase() !== adminEmail) {
        alert("No tiene permiso para acceder a esta página");
        window.location.href = 'index.html';
        return;
    }

    console.log("Bienvenido administrador: ", user.email);
});

async function cargarUsuarios() {
    const userList = document.getElementById("userList");

    const snapshot = await getDocs(collection(db, "users"));

    snapshot.forEach(doc => {
        const data = doc.data();

        const storageLink = `https://console.firebase.google.com/project/swlc-9085b/storage/swlc-9085b.firebasestorage.app/files/userFiles/${data.uid}`;

        const row = `<tr>
                <td>${data.firstName}</td>
                <td>${data.lastName}</td>
                <td>${data.email}</td>
                <td><a href="${storageLink}" target="_blank">Ver Carpeta</a></td>
                <td>
                    <button class="approveBtn" data-id="${data.uid}">Aprobar</button>
                    <button class="denyBtn" data-id="${data.uid}">Denegar</button>
                </td>
            </tr>`;

        userList.innerHTML += row;
    });

    activarBotones();
}

function activarBotones() {
    document.querySelectorAll(".approvenBtn").forEach(btn => {
        btn.addEventListener("click", (event) => {
            const uid = event.target.dataset.id;
            alert("Aprobar usuario: " + uid);
        });
    });

    document.querySelectorAll(".denyBtn").forEach(btn => {
        btn.addEventListener("click", (event) => {
            const uid = event.target.dataset.id;
            alert("Denegar usuario: " + uid);
        });
    });
}