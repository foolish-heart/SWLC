import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4I99PME3SWxEl_qYPkBL7TAmeY02bHSw",
  authDomain: "swlc-9085b.firebaseapp.com",
  projectId: "swlc-9085b",
  storageBucket: "swlc-9085b.firebasestorage.app",
  messagingSenderId: "321447612795",
  appId: "1:321447612795:web:fb117bb04e72d3734e2dde"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const numTramite = localStorage.getItem("tramiteActual");
document.getElementById("numTramite").textContent = numTramite;

const nombresBonitos = {
    nuevaLicencia: "Nueva licencia",
    renovacion: "Renovación",
    renovacionAscenso: "Renovación y ascenso",
    duplicado: "Duplicado"
};


let tipoTramite = null;

(async () => {
    const docRef = doc(db, "tramites", numTramite);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
        tipoTramite = snap.data().tipoTramite;
        document.getElementById("tipoTramiteTexto").textContent = nombresBonitos[tipoTramite];
    } else {
        alert("Error: trámite no encontrado.");
    }
})();

const requisitos = {

    nuevaLicencia: {
        M: [
            { nombre: "cedula", texto: "Cédula de Identidad" },
            { nombre: "medico", texto: "Certificado médico" },
            { nombre: "antecedentes", texto: "Certificado de antecedentes" },
            { nombre: "habilidades", texto: "Certificado de examen de conducción" }
        ],
        P: [
            { nombre: "cedula", texto: "Cédula de Identidad" },
            { nombre: "medico", texto: "Certificado médico" },
            { nombre: "antecedentes", texto: "Certificado de antecedentes" },
            { nombre: "habilidades", texto: "Certificado de examen de conducción" }
        ],
        A: [
            { nombre: "cedula", texto: "Cédula de Identidad" },
            { nombre: "medico", texto: "Certificado médico" },
            { nombre: "antecedentes", texto: "Certificado de antecedentes" },
            { nombre: "habilidades", texto: "Certificado de examen de conducción" }
        ],
        T: [
            { nombre: "cedula", texto: "Cédula de Identidad" },
            { nombre: "medico", texto: "Certificado médico" },
            { nombre: "antecedentes", texto: "Certificado de antecedentes" },
            { nombre: "habilidades", texto: "Certificado de examen de conducción" }
        ]
    },

    renovacion: {
        M: [
            { nombre: "cedula", texto: "Cédula de Identidad" },
            { nombre: "licencia", texto: "Licencia para conducir caducada" },
            { nombre: "medico", texto: "Certificado médico" },
            { nombre: "antecedentes", texto: "Certificado de antecedentes" }
        ],
        P: [
            { nombre: "cedula", texto: "Cédula de Identidad" },
            { nombre: "licencia", texto: "Licencia para conducir caducada" },
            { nombre: "medico", texto: "Certificado médico" },
            { nombre: "antecedentes", texto: "Certificado de antecedentes" }
        ],
        A: [
            { nombre: "cedula", texto: "Cédula de Identidad" },
            { nombre: "licencia", texto: "Licencia para conducir caducada" },
            { nombre: "medico", texto: "Certificado médico" },
            { nombre: "antecedentes", texto: "Certificado de antecedentes" }
        ],
        T: [
            { nombre: "cedula", texto: "Cédula de Identidad" },
            { nombre: "licencia", texto: "Licencia para conducir caducada" },
            { nombre: "medico", texto: "Certificado médico" },
            { nombre: "antecedentes", texto: "Certificado de antecedentes" }
        ]
    },

    renovacionAscenso: {
        M: [
            { nombre: "cedula", texto: "Cédula de Identidad" },
            { nombre: "licencia", texto: "Licencia para conducir caducada" },
            { nombre: "medico", texto: "Certificado médico" },
            { nombre: "antecedentes", texto: "Certificado de antecedentes" },
            { nombre: "habilidades", texto: "Certificado de examen de conducción" }
        ],
        P: [
            { nombre: "cedula", texto: "Cédula de Identidad" },
            { nombre: "licencia", texto: "Licencia para conducir caducada" },
            { nombre: "medico", texto: "Certificado médico" },
            { nombre: "antecedentes", texto: "Certificado de antecedentes" },
            { nombre: "habilidades", texto: "Certificado de examen de conducción" }
        ],
        A: [
            { nombre: "cedula", texto: "Cédula de Identidad" },
            { nombre: "licencia", texto: "Licencia para conducir caducada" },
            { nombre: "medico", texto: "Certificado médico" },
            { nombre: "antecedentes", texto: "Certificado de antecedentes" },
            { nombre: "habilidades", texto: "Certificado de examen de conducción" }
        ],
        T: [
            { nombre: "cedula", texto: "Cédula de Identidad" },
            { nombre: "licencia", texto: "Licencia para conducir caducada" },
            { nombre: "medico", texto: "Certificado médico" },
            { nombre: "antecedentes", texto: "Certificado de antecedentes" },
            { nombre: "habilidades", texto: "Certificado de examen de conducción" }
        ]
    },

    duplicado: {
        M: [
            { nombre: "cedula", texto: "Cédula de Identidad" },
            { nombre: "denuncia", texto: "Formulario de denuncia del SEGIP" }
        ],
        P: [
            { nombre: "cedula", texto: "Cédula de Identidad" },
            { nombre: "denuncia", texto: "Formulario de denuncia del SEGIP" }
        ],
        A: [
            { nombre: "cedula", texto: "Cédula de Identidad" },
            { nombre: "denuncia", texto: "Formulario de denuncia del SEGIP" }
        ],
        T: [
            { nombre: "cedula", texto: "Cédula de Identidad" },
            { nombre: "denuncia", texto: "Formulario de denuncia del SEGIP" }
        ]
    }

};

const categoriaSelect = document.getElementById("categoriaSelect");
const requisitosContainer = document.getElementById("requisitosContainer");
const checkboxExtra = document.getElementById("checkboxExtra");
const requiereHabilidadesExtra = document.getElementById("requiereHabilidadesExtra");

categoriaSelect.addEventListener("change", () => {
    if (!tipoTramite) return;

    requisitosContainer.innerHTML = "";
    checkboxExtra.style.display = "none";

    const categoria = categoriaSelect.value;

    let lista = requisitos[tipoTramite][categoria];

    if (tipoTramite === "renovacion") {
        checkboxExtra.style.display = "block";
    }

    lista.forEach(req => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p>${req.texto}</p>
            <input type="file" id="${req.nombre}" />
        `;
        requisitosContainer.appendChild(div);
    });

    requiereHabilidadesExtra.onchange = () => {
        if (requiereHabilidadesExtra.checked) {
            const extraDiv = document.createElement("div");
            extraDiv.id = "extraHabilidades";
            extraDiv.innerHTML = `
                <p>Certificado de habilidades de conducción (extra)</p>
                <input type="file" id="certificado_extra">
            `;
            requisitosContainer.appendChild(extraDiv);
        } else {
            const d = document.getElementById("extraHabilidades");
            if (d) d.remove();
        }
    };

});

document.getElementById("btnFinalizar").addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) return alert("Debe iniciar sesión");

    const categoria = categoriaSelect.value;
    if (!categoria) return alert("Seleccione una categoría");

    const lista = requisitos[tipoTramite][categoria];

    const uploads = {};

    for (let req of lista) {
        const fileInput = document.getElementById(req.nombre);
        if (!fileInput.files[0]) {
            return alert(`Debe subir: ${req.texto}`);
        }

        const file = fileInput.files[0];
        const fileRef = ref(storage, `tramites/${user.uid}/${numTramite}/${req.nombre}_${file.name}`);

        const snap = await uploadBytes(fileRef, file);
        const url = await getDownloadURL(snap.ref);

        uploads[req.nombre] = url;
    }

    if (requiereHabilidadesExtra.checked) {
        const fileInput = document.getElementById("certificado_extra");

        if (!fileInput.files[0]) {
            return alert("Debe subir el certificado extra");
        }

        const file = fileInput.files[0];
        const fileRef = ref(storage, `tramites/${user.uid}/${numTramite}/extra_habilidades_${file.name}`);

        const snap = await uploadBytes(fileRef, file);
        const url = await getDownloadURL(snap.ref);

        uploads["extra_habilidades"] = url;
    }

    const docRef = doc(db, "tramites", numTramite);

    await updateDoc(docRef, {
        categoria: categoria,
        documentos: uploads,
        estado: "documentos_subidos"
    });

    alert("Documentos subidos correctamente. Trámite completado.");

    window.location.href = "index.html";
});
