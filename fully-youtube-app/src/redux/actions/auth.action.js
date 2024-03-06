import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import auth from "../../firebase";

export const login = () => async (dispatch) => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
