import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    setPersistence,
    browserSessionPersistence
 } from 'firebase/auth';
import { EmailAuthCredential } from 'firebase/auth/web-extension';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { auth, handleSignUp, handleSignIn, handleSignOut } from './auth.js'; 
import { onAuthStateChanged } from 'firebase/auth';


