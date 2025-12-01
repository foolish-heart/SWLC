import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, getDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

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
const storage = getStorage(app);

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const btnCamara = document.getElementById("btnIniciarCamara");
const btnFoto = document.getElementById("tomarFoto");
const img = document.getElementById("foto");
const inputArchivo = document.getElementById("inputArchivo");

const selectTramite = document.getElementById("select");
const btnSiguiente = document.getElementById("btnSiguiente");

function generarNumeroTramite() {
    return "TRAM-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}

const numTramite = generarNumeroTramite();
document.getElementById("numTramite").textContent = numTramite;

let numTramiteGlobal = generarNumeroTramite();
tramiteSpan.textContent = numTramiteGlobal;

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if(loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('loggedUserNames').innerText = userData.nombres;
                document.getElementById('loggedUserEmail').innerText = userData.email;
                document.getElementById('loggedUserApellidos').innerText = userData.apellidos;
            } else {
                console.log("No document found matching ID")
            }
        })

        .catch((error) => {
            console.log("Error getting document");
        })
    } else {
        console.log("User ID not found")
    }
})

btnCamara.addEventListener("click", async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
});

btnFoto.addEventListener("click", () => {
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL("image/png");
    imgCapturada.src = dataURL;
});

btnSiguiente.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) {
        alert("Seleccione un tipo de trámite antes de continuar.");
        return;
    }

    await setDoc(doc(db, "tramites", numTramiteGlobal), {
        uid: user.uid,
        nombres: nombreSpan.textContent,
        apellidos: apellidoSpan.textContent,
        email: emailSpan.textContent,
        tipoTramite: tipo,
        fotoBase64: imgCapturada.src || null,
        fecha: new Date().toISOString()
    });

    alert("Datos guardados satisfactoriamente.");
    window.location.href = "nuevo-tramite2.html";
});