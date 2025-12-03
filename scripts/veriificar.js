import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, getDocs, doc, collection, query, where, getDoc} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

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

const tramiteSelect = document.getElementById("tramiteSelect");
const mensaje = document.getElementById("mensaje");
const verificarBtn = document.getElementById("verificarBtn");

const nombresBonitos = {
    nuevaLicencia: "Nueva Licencia",
    renovacion: "Renovación",
    renovacionAscenso: "Renovación y Ascenso",
    duplicado: "Duplicado"
};

function beautify(text) {
    return text
        .replace(/_/g, " ")             
        .replace(/([A-Z])/g, " $1")     
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, c => c.toUpperCase()); 
}

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        mensaje.textContent = "Debe iniciar sesión.";
        return;
    }

    console.log("Usuario logueado:", user.uid);

    const q = query(
        collection(db, "tramites"),
        where("uid", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        mensaje.textContent = "No tiene tramites registrados.";
        return;
    }

    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const opcion = document.createElement("option");

        opcion.value = docSnap.id;
        const tipoBonito = beautify(nombresBonitos[data.tipoTramite] || data.tipoTramite);
        opcion.textContent = `${data.numeroTramite} - ${tipoBonito}`;


        tramiteSelect.appendChild(opcion);
    });
});

verificarBtn.addEventListener("click", async () => {
    const tramiteId = tramiteSelect.value;

    if (tramiteId === "") {
        mensaje.textContent = "Seleccione un trámite.";
        return;
    }

    const docRef = doc(db, "tramites", tramiteId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        mensaje.textContent = "Error: el trámite no existe.";
        return;
    }

    const estado = docSnap.data().estado.toLowerCase();

    if (estado === "aprobado") {
        window.location.href = 'verification-pages/aprobado.html';
    } else if (estado === "pendiente") {
        window.location.href = 'verification-pages/pendiente.html';
    } else if (estado === "denegado") {
        window.location.href = 'verification-pages/denegado.html';
    } else {
        mensaje.textContent = "Estado desconocido.";
    }
});