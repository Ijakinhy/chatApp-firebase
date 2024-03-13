import { request } from "../../api";
import {
  HOME_VIDEO_FAIL,
  HOME_VIDEO_REQUEST,
  HOME_VIDEO_SUCCESS,
} from "../actionType";

export const getPopularVideos = () => async (dispatch) => {
  try {
    dispatch({
      type: HOME_VIDEO_REQUEST,
    });
    const res = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        maxResults: 50,
        pageToken: "",
        regionCode: "US",
      },
    });
    dispatch({
      type: HOME_VIDEO_SUCCESS,
      payload: {
        videos: res.data.items,
        nextPageToken: res.data.nextPageToken,
        category: "All",
      },
    });

    // console.log(res);
  } catch (error) {
    dispatch({
      type: HOME_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getVideosByCategory = (keyword) => async (dispatch, getStage) => {
  try {
    dispatch({
      type: HOME_VIDEO_REQUEST,
    });
    const res = await request("/search", {
      params: {
        part: "snippet",
        maxResults: 50,
        pageToken: getStage().homeVideos.nextPageToken,
        q: keyword,
        type: "video",
      },
    });
    dispatch({
      type: HOME_VIDEO_SUCCESS,
      payload: {
        videos: res.data.items,
        nextPageToken: res.data.nextPageToken,
        category: keyword,
      },
    });

    // console.log(res);
  } catch (error) {
    dispatch({
      type: HOME_VIDEO_FAIL,
      payload: error.message,
    });
  }
};
