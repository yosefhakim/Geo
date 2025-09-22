import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgcF_rqFTl2v-15-fsHX1sxfx9X-kf8Kc",
  authDomain: "mobde3-5e547.firebaseapp.com",
  projectId: "mobde3-5e547",
  storageBucket: "mobde3-5e547.firebasestorage.app",
  messagingSenderId: "578038113316",
  appId: "1:578038113316:web:e31918ec9f475cd39324b1",
  measurementId: "G-5YGZ5ES0ME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);