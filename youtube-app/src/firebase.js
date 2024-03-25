import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2a7r7QSQfx02WAGjS3xUjIG_cPFuds1w",
  authDomain: "jakin-videos-app.firebaseapp.com",
  projectId: "jakin-videos-app",
  storageBucket: "jakin-videos-app.appspot.com",
  messagingSenderId: "325915019502",
  appId: "1:325915019502:web:0b42d959c65a8ce0d10bff",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
