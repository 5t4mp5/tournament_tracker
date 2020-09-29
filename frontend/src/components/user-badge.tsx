import * as React from "react";
import { connect } from "react-redux";
import { User, fetchUser } from "../store/user";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

interface PropsUserBadge {
  image?: string;
  name?: string;
  fetchUser: (id: string) => Promise<void>;
}

const _UserBadge = (props: PropsUserBadge) => {
  const { image, name, fetchUser } = props;
  React.useEffect(() => {
    fetchUser("95f73b8e-b1b9-4b7b-8561-9b1ce1d610ae").catch((e) =>
      console.error(e)
    );
  });
  console.log("IMAGE", image);
  console.log("NAME", name);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "120px",
        height: "120px",
      }}
    >
      <img
        src={image}
        style={{ height: "100%", width: "100%", borderRadius: "50%" }}
      />
      <span>{name}</span>
    </div>
  );
};

const mapStateToProps = (state: User) => ({
  image: state.avatar,
  name: state.username,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<User, undefined, Action>
) => ({
  fetchUser: (id: string) => dispatch(fetchUser(id)),
});

export const UserBadge = connect(
  mapStateToProps,
  mapDispatchToProps
)(_UserBadge);
