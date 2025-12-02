import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, getDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

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
const btnCamara = document.getElementById("btnCamara");
const btnFoto = document.getElementById("tomarFoto");
const img = document.getElementById("foto");
const inputArchivo = document.getElementById("inputArchivo");

const selectTramite = document.getElementById("select");
const btnSiguiente = document.getElementById("btnSiguiente");

const numTramiteSpan = document.getElementById("numTramite");

function generarNumeroTramite() {
    return "TRAM-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}

let numTramiteGlobal = generarNumeroTramite();
numTramiteSpan.textContent = numTramiteGlobal;

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
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

    } catch (err) {
        console.error(err);
        alert("No se pudo acceder a la cámara: " + err);
    }
});

btnFoto.addEventListener("click", () => {
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL("image/png");
    img.src = dataURL;

    video.style.display = "none";
    img.style.display = "block";
});

const nombreSpan = document.getElementById("loggedUserNames");
const apellidoSpan = document.getElementById("loggedUserApellidos");
const emailSpan = document.getElementById("loggedUserEmail");

btnSiguiente.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) return;
    
    const tipoTramite = selectTramite.value;
    if (!tipoTramite) {
        alert("Seleccione un tipo de trámite antes de continuar.");
        return;
    }

    
    let fotoBlob = null;
    if (img.src) {
        const response = await fetch(img.src);
        fotoBlob = await response.blob();
    }

    let fotoURL = null;
    if (fotoBlob) {
        const fotoRef = ref(storage, `tramites/${user.uid}/${numTramiteGlobal}/foto.png`);
        console.log("Subiendo a:", `tramites/${user.uid}/${numTramiteGlobal}/foto.png`);
        const snapshot = await uploadBytes(fotoRef, fotoBlob);
        fotoURL = await getDownloadURL(snapshot.ref);
    }

    await setDoc(doc(db, "tramites", numTramiteGlobal), {
        uid: user.uid,
        nombres: nombreSpan.textContent,
        apellidos: apellidoSpan.textContent,
        email: emailSpan.textContent,
        tipoTramite: tipoTramite,
        fotoURL: fotoURL,
        numeroTramite: numTramiteGlobal,
        fecha: new Date().toISOString(),
        estado: "pendiente",
    });

    localStorage.setItem("tramiteActual", numTramiteGlobal);

    window.location.href = "nuevoTram.html";
});