import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//reducers
import { userStore } from "./user";

const reducer = combineReducers({ userStore });

export const store = createStore(reducer, applyMiddleware(thunk));
