import type { PropsWithChildren } from "react";

import "../../styles/tokens.css";
import "../../styles/motion.css";

interface AppShellProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
}

export function AppShell({
  children,
  title = "History Map",
  subtitle = "A map-led chronicle of Chinese history",
}: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <p className="app-shell__eyebrow">Terrain Sandbox / Digital Scroll</p>
        <h1>{title}</h1>
        <p className="app-shell__subtitle">{subtitle}</p>
      </header>
      <main className="app-shell__content">{children}</main>
    </div>
  );
}
