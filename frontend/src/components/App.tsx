import { UserBadge } from "./user-badge";
import * as React from "react";
import axios from "axios";
const { useState } = React;

export function App() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);

  axios.get("/api/user/e57a643f-3da1-4ebd-9edd-16cc8b47bd01").then((res) => {
    setImage(res.data.avatar);
    setName(res.data.userame);
  });
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <UserBadge name={name} image={image} />
    </div>
  );
}
