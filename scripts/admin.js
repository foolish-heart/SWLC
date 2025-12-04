import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, getDocs, doc, collection, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

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
let tramitesCache = [];

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

    console.log("Bienvenido administrador.");
    cargarTramites();
});

async function cargarTramites() {
    console.log("Ejecutando carga de trámites.");

    tramitesCache = [];

    const snapshot = await getDocs(collection(db, "tramites"));

    snapshot.forEach(docSnap => {
        const data = docSnap.data();

        tramitesCache.push({
            id: docSnap.id,
            numero: data.numeroTramite,
            nombre: data.nombres + " " + data.apellidos,
            uid: data.uid,
            tipo: data.tipoTramite,
            estado: data.estado
        });
    });

   aplicarFiltros();

}

function renderTabla(lista) {
    const tramiteList = document.getElementById("tramiteList");
    tramiteList.innerHTML = "";

    lista.forEach(item => {
        const storageLink = `https://console.firebase.google.com/project/swlc-9085b/storage/swlc-9085b.firebasestorage.app/files/tramites/${item.uid}/${item.numero}/`;

        const row = `
            <tr>
                <td>${item.numero}</td>
                <td>${item.nombre}</td>
                <td>${item.tipo}</td>
                <td>${item.estado}</td>
                <td><a href="${storageLink}" target="_blank">Ver Archivos</a></td>
                <td>
                    <button class="approveBtn" data-id="${item.id}">Aprobar</button>
                    <button class="denyBtn" data-id="${item.id}">Denegar</button>
                </td>
            </tr>
        `;

        tramiteList.innerHTML += row;
    });

    activarBotones();
}


function activarBotones() {
    document.querySelectorAll(".approveBtn").forEach(btn => {
        btn.addEventListener("click", (event) => {
            const id = event.target.dataset.id;
            actualizarEstado(id, "aprobado");
        });
    });

    document.querySelectorAll(".denyBtn").forEach(btn => {
        btn.addEventListener("click", (event) => {
            const id = event.target.dataset.id;
            actualizarEstado(id, "denegado");
        });
    });
}

async function actualizarEstado(id, estadoNuevo) {
    const tramiteRef = doc(db, "tramites", id);
    const tramiteSnap = await getDoc(tramiteRef);

    if (!tramiteSnap.exists()) {
        alert("Error: El trámite no existe.");
        return;
    }

    const data = tramiteSnap.data();

    const userEmail = data.email;       
    const userName = data.nombres + " " + data.apellidos; 
    const tramiteID = data.numeroTramite;
    const nuevoEstado = estadoNuevo;

    await updateDoc(tramiteRef, {
        estado: nuevoEstado
    });

    emailjs.send("service_w8q1r4a", "template_5jekukm", {
        to_email: userEmail,
        user_name: userName,
        tramite_id: tramiteID,
        estado: nuevoEstado
    })
    .then(() => {
        alert("Estado actualizado y correo enviado.");
    })
    .catch((err) => {
        console.error(err);
        alert("Estado actualizado, pero hubo un error enviando el correo.");
    });

    cargarTramites();
}


document.getElementById("estadoFiltro").addEventListener("change", aplicarFiltros);
document.getElementById("searchInput").addEventListener("input", aplicarFiltros);

function aplicarFiltros() {
    const texto = document.getElementById("searchInput").value.toLowerCase();
    const estadoFiltro = document.getElementById("estadoFiltro").value;

    const filtrados = tramitesCache.filter(t => {
        const coincideTexto =
            t.nombre.toLowerCase().includes(texto) ||
            t.tipo.toLowerCase().includes(texto) ||
            t.numero.toLowerCase().includes(texto);

        const coincideEstado =
            estadoFiltro === "todos" || t.estado.toLowerCase() === estadoFiltro;

        return coincideTexto && coincideEstado;
    });

    renderTabla(filtrados);
}

document.getElementById("logout").addEventListener("click", () => {
    signOut(auth).then(() => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Error al cerrar sesión", error);
    });
});