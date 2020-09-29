import axios from "axios";
import { createStore } from "redux";

export const userStore = (state: User, action: UserAction) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    default:
      return state || null;
  }
};

export interface User {
  id: string;
  username: string;
  avatar: string;
  email: string;
}

export interface UserAction {
  type: "SET_USER";
  user: User;
}

const setUser = (data: User) => {
  return {
    type: "SET_USER",
    user: data,
  };
};

export const fetchUser = (id: string) => {
  return (dispatch: any) => {
    return axios
      .get(`api/user/${id}`)
      .then((res) => res.data)
      .then((user) => {
        console.log("USER", user);
        return dispatch(setUser(user));
      });
  };
};
