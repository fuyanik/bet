// Client-side Firebase Configuration
import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Firebase Config - direkt tanımlandı
const firebaseConfig = {
  apiKey: "AIzaSyAZNl0b00ueiK-MkALu6HG32Bt5hM_qzyM",
  authDomain: "selenium-d9ecd.firebaseapp.com",
  databaseURL: "https://selenium-d9ecd-default-rtdb.firebaseio.com",
  projectId: "selenium-d9ecd",
  storageBucket: "selenium-d9ecd.firebasestorage.app",
  messagingSenderId: "407045868474",
  appId: "1:407045868474:web:2430ed4cdd8fd0d0e3eb83",
  measurementId: "G-Y6BE8CQ8ND"
};

// Initialize Firebase (only once)
let app;
let analytics = null;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  
  // Initialize Analytics (only in browser and if supported)
  if (typeof window !== "undefined") {
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
        console.log("🔥 Firebase Analytics aktif!");
      }
    });
  }
} else {
  app = getApps()[0];
}

// Initialize Firebase Storage
export const storage = getStorage(app);

// Initialize Firestore
export const db = getFirestore(app);

// Export analytics
export { analytics };

export default app;
