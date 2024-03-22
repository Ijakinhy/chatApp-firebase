import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAc8E-74W27Du2BxmuHB6z4wKJMc3dpo6I",
  authDomain: "ijakinhy-videos-app.firebaseapp.com",
  projectId: "ijakinhy-videos-app",
  storageBucket: "ijakinhy-videos-app.appspot.com",
  messagingSenderId: "400840664434",
  appId: "1:400840664434:web:9ab8beb255e702cd99a9eb",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
