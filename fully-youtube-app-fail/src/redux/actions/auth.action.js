import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import auth from "../../firebase";
import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "../actionType";

const provider = new GoogleAuthProvider();

export const login = () => async (dispatch) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      dispatch({
        type: LOGIN_REQUEST,
      });
      const accessToken = result.user.accessToken;
      const profile = {
        name: result.user.displayName,
        photoUrl: result.user.photoURL,
      };

      provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

      sessionStorage.setItem("yout-access-token", accessToken);
      sessionStorage.setItem("yout-user", JSON.stringify(profile));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          accessToken,
          profile,
        },
      });
      dispatch({
        type: LOAD_PROFILE,
        payload: profile,
      });
    })
    .catch((error) => {
      console.log(error.message);

      dispatch({
        type: LOGIN_FAIL,
        payload: error.message,
      });
    });
};

export const log_out = () => async (dispatch) => {
  signOut(auth).then(() => {
    dispatch({
      type: LOG_OUT,
    });
    sessionStorage.removeItem("yout-access-token");
    sessionStorage.removeItem("yout-user");
  });
};
