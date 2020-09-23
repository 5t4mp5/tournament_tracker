import axios from "axios";
import { createStore } from "redux";

const user = (state: User, action: UserAction) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    default:
      return state;
  }
};

export interface User {
  id: string;
  username: string;
  avatar: string;
  email: string;
}

interface UserAction {
  type: "SET_USER";
  user: User;
}

export const getUser = (id: string) => {
  return axios
    .get(`/api/user/${id}`)
    .then((res) => {
      return userStore.dispatch({
        type: "SET_USER",
        user: res.data,
      });
    })
    .then(() => console.log("STATE", userStore.getState()));
};

export const userStore = createStore(user);
