import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

const initalState = {
  name: "jakin",
  age: 123,
};
const reducer = (initalState) => initalState;

const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
