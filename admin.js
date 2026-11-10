// KFGC ADMIN LOGIN — SECURED VERSION

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPWH5BCSFp3Qqs_-JVfqDkUCEfhyg4VX4",
  authDomain: "kfgc-media-app.firebaseapp.com",
  projectId: "kfgc-media-app",
  storageBucket: "kfgc-media-app.firebasestorage.app",
  messagingSenderId: "203397572574",
  appId: "1:203397572574:web:db903da199482fd6cedf4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Authorized administrator
const ADMIN_UID = "PrMQL05Yuwe8qdR9qwxN41WO8oX2";
// Login elements
const form = document.getElementById("adminLoginForm");
const errorBox = document.getElementById("loginError");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorBox.textContent = "";

  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value;

  try {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Verify administrator UID
    if (result.user.uid !== ADMIN_UID) {
      await signOut(auth);

      errorBox.textContent =
        "Access denied. You are not an authorized administrator.";

      return;
    }

    // Authorized administrator
    window.location.href = "index.html";

  } catch (error) {
    console.error("Admin login error:", error.code);

    if (error.code === "auth/invalid-credential") {
      errorBox.textContent = "Incorrect email or password.";

    } else if (error.code === "auth/too-many-requests") {
      errorBox.textContent =
        "Too many attempts. Please try again later.";

    } else {
      errorBox.textContent =
        "Login failed. Please check your details.";
    }
  }
});
