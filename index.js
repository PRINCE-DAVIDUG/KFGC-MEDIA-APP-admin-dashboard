// ========================================
// KFGC ADMIN DASHBOARD
// Authentication and Navigation Controller
// ========================================

import {
initializeApp,
getApps,
getApp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
getAuth,
onAuthStateChanged,
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

// Initialize Firebase safely
const app = getApps().length
? getApp()
: initializeApp(firebaseConfig);

const auth = getAuth(app);

// Authorized administrator
const ADMIN_UID = "PrMQL05Yuwe8qdR9qwxN41WO8oX2";

// Login page
const LOGIN_PAGE = "admin.html";

// ========================================
// AUTHENTICATION GUARD
// ========================================

onAuthStateChanged(auth, async (user) => {

if (!user) {
window.location.replace(LOGIN_PAGE);
return;
}

if (user.uid !== ADMIN_UID) {

await signOut(auth);

window.location.replace(LOGIN_PAGE);
return;

}

// Show dashboard only after verification
document.body.classList.add("admin-authorized");

console.log("KFGC administrator verified.");
});

// ========================================
// MOBILE NAVIGATION
// ========================================

const menuToggle = document.getElementById("menu-toggle");
const primaryNav = document.getElementById("primary-nav");

if (menuToggle && primaryNav) {

menuToggle.addEventListener("click", () => {

const expanded =
  menuToggle.getAttribute("aria-expanded") === "true";

menuToggle.setAttribute(
  "aria-expanded",
  String(!expanded)
);

primaryNav.classList.toggle("open");

});

}

// ========================================
// SECURE LOGOUT
// ========================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

logoutBtn.addEventListener("click", async () => {

logoutBtn.disabled = true;
logoutBtn.textContent = "Logging out...";

try {

  await signOut(auth);

  window.location.replace(LOGIN_PAGE);

} catch (error) {

  console.error("Logout error:", error);

  alert("Logout failed. Please try again.");

  logoutBtn.disabled = false;
  logoutBtn.textContent = "Logout";

}

});

                            }
