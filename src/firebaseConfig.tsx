import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBt4Cdvha70M69tILQld9oNfZ-LJj9a5Gc",
    authDomain: "project-1-d9671.firebaseapp.com",
    projectId: "project-1-d9671",
    storageBucket: "project-1-d9671.firebasestorage.app",
    messagingSenderId: "115024565469",
    appId: "1:115024565469:web:edb8abf51f00c3b0a03734",
    measurementId: "G-E2BTTPFNCL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut,analytics };
