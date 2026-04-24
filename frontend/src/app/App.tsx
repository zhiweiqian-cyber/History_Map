import { Outlet } from "react-router-dom";

import { AppShell } from "../components/layout/AppShell";

export function App() {
  return (
    <AppShell
      title="China History Chronicle"
      subtitle="Enter through the national map, then move from province to dynasty without losing the place."
    >
      <Outlet />
    </AppShell>
  );
}
