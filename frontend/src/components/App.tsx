import * as React from "react";

//Components
import { UserBadge } from "./user-badge";

export function App() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <UserBadge />
    </div>
  );
}
