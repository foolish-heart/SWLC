import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

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
const db = getFirestore();

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

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(() => {
        window.location.href = 'index.html';
    })

    .catch((error) => {
        console.error('Error de cierre de sesion: ', error);
    })
})