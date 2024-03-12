import {
  HOME_VIDEO_FAIL,
  HOME_VIDEO_REQUEST,
  HOME_VIDEO_SUCCESS,
} from "../actionType";

const initalState = {
  videos: [],
  nextPageToken: null,
  loading: false,
};
export const homeVideoReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case HOME_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case HOME_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: payload.videos,
        nextPageToken: payload.nextPageToken,
      };
    case HOME_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
