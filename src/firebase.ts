import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_HBHmx-fVs6jzLkwJ4JIJcQ1PmwP13Mk",
  authDomain: "ecos-233a2.firebaseapp.com",
  projectId: "ecos-233a2",
  storageBucket: "ecos-233a2.firebasestorage.app",
  messagingSenderId: "433864296197",
  appId: "1:433864296197:web:137be5bddaf421ee19996c",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;