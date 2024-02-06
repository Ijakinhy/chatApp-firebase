import { initializeApp } from "firebase/app";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const login = () => async (dispatch) => {
  try {
    const Provider = new GoogleAuthProvider();
    signInWithPopup(auth, Provider).then((result) => {
      console.log(result);
    });
  } catch (error) {
    console.log(`sign in ${error}`);
  }
};
