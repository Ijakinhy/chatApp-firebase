import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import { authReducer } from "./reducers/auth.reducer";
import {
  homeVideoReducer,
  selectedVideosReducer,
} from "./reducers/video.reducer";
import { channelDetailsReducer } from "./reducers/channel.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideoReducer,
  selectedVideo: selectedVideosReducer,
  channelDetails: channelDetailsReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
