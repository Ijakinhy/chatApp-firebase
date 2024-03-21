import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_PROFILE,
  LOG_OUT,
} from "../actionType";

const initialState = {
  accessToken: sessionStorage.getItem("yout-access-token")
    ? sessionStorage.getItem("yout-access-token")
    : null,
  user: sessionStorage.getItem("yout-user")
    ? JSON.parse(sessionStorage.getItem("yout-user"))
    : null,
  loading: false,
};

export const authReducer = (prevState = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...prevState,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...prevState,
        accessToken: payload,
        loading: false,
      };

    case LOAD_PROFILE:
      return {
        ...prevState,
        user: payload,
      };

    case LOGIN_FAIL:
      return {
        ...prevState,
        loading: false,
        error: payload,
      };
    case LOG_OUT:
      return {
        ...prevState,
        loading: false,
        accessToken: payload,
      };
    default:
      return prevState;
  }
};
