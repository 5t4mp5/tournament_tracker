import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//reducers
import { userStore, User } from "./user";

export interface State {
  user: User;
}

const reducer = combineReducers({ user: userStore });

export const store = createStore(reducer, applyMiddleware(thunk));
