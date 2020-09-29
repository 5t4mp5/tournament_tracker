import { UserBadge } from "./user-badge";
import * as React from "react";

export function App() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <UserBadge />
    </div>
  );
}
