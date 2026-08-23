import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBK7FC0Fjyuv8ZwkJpTWXOl5hyiKoY1Fh8",
  authDomain: "oblivion-agent.firebaseapp.com",
  projectId: "oblivion-agent",
  storageBucket: "oblivion-agent.firebasestorage.app",
  messagingSenderId: "1068005745570",
  appId: "1:1068005745570:web:7e9e5fab02abc7a2a288fb",
  measurementId: "G-DY248YFXMS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
