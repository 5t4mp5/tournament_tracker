import axios from "axios";

export const userStore = (
  state: User = defaultUserState,
  action: UserAction
) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    default:
      return state;
  }
};

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
        return dispatch(setUser(user));
      });
  };
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

const defaultUserState = {
  id: "",
  username: "",
  avatar: "",
  email: "",
};
