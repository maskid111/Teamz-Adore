// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmDGQC3hsDoHvepmlHkvimX8DUg0X-hYY",
    authDomain: "teamz-adore-d76ad.firebaseapp.com",
    projectId: "teamz-adore-d76ad",
    storageBucket: "teamz-adore-d76ad.firebasestorage.app",
    messagingSenderId: "99067685820",
    appId: "1:99067685820:web:62cda395f0a1ebc99fd9b9"
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = firebaseConfig;
} else {
    window.firebaseConfig = firebaseConfig;
}
