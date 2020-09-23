import * as React from "react";
import { connect } from "react-redux";
import { User } from "../store/user";

interface PropsUserBadge {
  image?: string;
  name?: string;
}

const _UserBadge = (props: PropsUserBadge) => {
  const { image, name } = props;
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
  image: state?.avatar || "",
  name: state?.username || "",
});

export const UserBadge = connect(mapStateToProps)(_UserBadge);
