import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGj0tKHVf5iHjOfbkUvaLP__bU_X3h_rw",
  authDomain: "ijakinhy-video-app.firebaseapp.com",
  projectId: "ijakinhy-video-app",
  storageBucket: "ijakinhy-video-app.appspot.com",
  messagingSenderId: "294181020671",
  appId: "1:294181020671:web:1d98f9014bac5daa407dca",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
