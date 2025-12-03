import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, getDoc, doc, updateDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB4I99PME3SWxEl_qYPkBL7TAmeY02bHSw",
    authDomain: "swlc-9085b.firebaseapp.com",
    projectId: "swlc-9085b",
    storageBucket: "swlc-9085b.firebasestorage.app",
    messagingSenderId: "321447612795",
    appId: "1:321447612795:web:fb117bb04e72d3734e2dde"
};

// Inicializar
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const spanNombres = document.getElementById("loggedUserNames");
const spanApellidos = document.getElementById("loggedUserApellidos");
const spanEmail = document.getElementById("loggedUserEmail");

const inputNombres = document.getElementById("editNombres");
const inputApellidos = document.getElementById("editApellidos");
const inputEmail = document.getElementById("editEmail");

const btnEditar = document.getElementById("btnEditar");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");

const nombresBonitos = {
    nuevaLicencia: "Nueva licencia",
    renovacion: "Renovación",
    renovacionAscenso: "Renovación y ascenso",
    duplicado: "Duplicado"
};

let usuarioId = null;

// Cargar datos
onAuthStateChanged(auth, (user) => {
    usuarioId = localStorage.getItem("loggedInUserId");

    if (usuarioId) {
        const docRef = doc(db, "users", usuarioId);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();

                spanNombres.textContent = data.nombres;
                spanApellidos.textContent = data.apellidos;
                spanEmail.textContent = data.email;

                inputNombres.value = data.nombres;
                inputApellidos.value = data.apellidos;
                inputEmail.value = data.email;
            }
        });
    }

    cargarHistorial(usuarioId);

});


btnEditar.addEventListener("click", () => {
    spanNombres.style.display = "none";
    spanApellidos.style.display = "none";
    spanEmail.style.display = "none";

    inputNombres.style.display = "inline-block";
    inputApellidos.style.display = "inline-block";
    inputEmail.style.display = "inline-block";
    inputEmail.disabled = true;

    btnEditar.style.display = "none";
    btnGuardar.style.display = "inline-block";
    btnCancelar.style.display = "inline-block";
});

btnCancelar.addEventListener("click", () => {
    inputNombres.value = spanNombres.textContent;
    inputApellidos.value = spanApellidos.textContent;
    inputEmail.value = spanEmail.textContent;

    inputNombres.style.display = "none";
    inputApellidos.style.display = "none";
    inputEmail.style.display = "none";

    spanNombres.style.display = "inline";
    spanApellidos.style.display = "inline";
    spanEmail.style.display = "inline";

    btnGuardar.style.display = "none";
    btnCancelar.style.display = "none";
    btnEditar.style.display = "inline-block";
});

btnGuardar.addEventListener("click", async () => {
    const docRef = doc(db, "users", usuarioId);

    const nuevosDatos = {
        nombres: inputNombres.value,
        apellidos: inputApellidos.value
    };

    await updateDoc(docRef, nuevosDatos);

    spanNombres.textContent = nuevosDatos.nombres;
    spanApellidos.textContent = nuevosDatos.apellidos;

    inputNombres.style.display = "none";
    inputApellidos.style.display = "none";
    inputEmail.style.display = "none";

    spanNombres.style.display = "inline";
    spanApellidos.style.display = "inline";
    spanEmail.style.display = "inline";

    btnGuardar.style.display = "none";
    btnCancelar.style.display = "none";
    btnEditar.style.display = "inline-block";

    alert("Datos actualizados correctamente.");
});

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("loggedInUserId");
    signOut(auth).then(() => {
        window.location.href = "index.html";
    });
});

async function cargarHistorial(uid) {
    const historialBody = document.getElementById("historialBody");
    historialBody.innerHTML = ""; // limpiar tabla

    const q = query(
        collection(db, "tramites"),
        where("uid", "==", uid)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        historialBody.innerHTML = `
            <tr>
                <td colspan="3">No tienes trámites registrados</td>
            </tr>
        `;
        return;
    }

    snapshot.forEach(docSnap => {
        const t = docSnap.data();

        const row = `
            <tr>
                <td>${t.numeroTramite}</td>
                <td>${nombresBonitos[t.tipoTramite] || t.tipoTramite}</td>
                <td>${beautify(t.estado)}</td>
            </tr>
        `;

        historialBody.innerHTML += row;
    });
}

function beautify(text) {
    return text
        .replace(/_/g, " ")             
        .replace(/([A-Z])/g, " $1")     
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, c => c.toUpperCase()); 
}