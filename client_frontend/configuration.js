// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOXYdhhSFqyt17ZM_iFR9Rpkyu1F7cw-4",
  authDomain: "common-vendor.firebaseapp.com",
  projectId: "common-vendor",
  storageBucket: "common-vendor.appspot.com",
  messagingSenderId: "804921668744",
  appId: "1:804921668744:web:888706f745c689d2ecdb3d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);
