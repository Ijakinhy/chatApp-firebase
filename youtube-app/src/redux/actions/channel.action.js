import { useSelector } from "react-redux";
import { request } from "../../api";
import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
} from "../actionType";

export const getChannelDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_DETAILS_REQUEST,
    });
    const { data } = await request("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id: id,
      },
    });

    dispatch({
      type: CHANNEL_DETAILS_SUCCESS,
      payload: data.items[0],
    });
    // console.log(data);
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: CHANNEL_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

export const checkSubscriptionStatus = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;

    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet",
        forChannelId: id,
        channelId: id,
        mime: true,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch({
      type: SET_SUBSCRIPTION_STATUS,
      payload: data.items.length !== 0,
    });
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
