import * as React from "react";

interface PropsUserBadge {
  image: string;
  name: string;
}

export const UserBadge = (props: PropsUserBadge) => {
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
