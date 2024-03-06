import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwQL1EqCoWgSjYYK2n7RVGBjg1rhsHZ4Q",
  authDomain: "ijakiny-video-app.firebaseapp.com",
  projectId: "ijakiny-video-app",
  storageBucket: "ijakiny-video-app.appspot.com",
  messagingSenderId: "214905558591",
  appId: "1:214905558591:web:70aa50f4eb4cec9b444a8a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
