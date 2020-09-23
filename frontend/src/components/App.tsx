import { UserBadge } from "./user-badge";
import * as React from "react";
import { getUser } from "../store/user";

export function App() {
  getUser("95f73b8e-b1b9-4b7b-8561-9b1ce1d610ae");
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <UserBadge />
    </div>
  );
}
