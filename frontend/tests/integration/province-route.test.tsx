import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { App } from "../../src/app/App";
import { HomePage } from "../../src/features/home/HomePage";
import { ProvincePage } from "../../src/features/province/ProvincePage";
import { HistoryContextProvider } from "../../src/lib/state/historyContext";

function renderAt(pathname: string) {
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      <HistoryContextProvider>
        <Routes>
          <Route element={<App />} path="/">
            <Route element={<HomePage />} index />
            <Route element={<ProvincePage />} path="province/:provinceId" />
          </Route>
        </Routes>
      </HistoryContextProvider>
    </MemoryRouter>,
  );
}

describe("province route", () => {
  it("shows province identity and active dynastic context on direct load", async () => {
    renderAt("/province/shaanxi");

    expect(
      await screen.findByRole("heading", { name: "Shaanxi" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Province dossier")).toBeInTheDocument();
    expect(screen.getByText("Active dynastic segment")).toBeInTheDocument();
    expect(screen.getByText("Skeleton province")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Shaanxi anchors Chang'an" }),
    ).toBeInTheDocument();
  });

  it("lets readers switch between dynastic segments without losing province context", async () => {
    renderAt("/province/shaanxi");

    expect(
      await screen.findByRole("heading", { name: "Shaanxi" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Song to Qing" }));

    expect(
      screen.getByText("Shaanxi becomes the northwest hinge"),
    ).toBeInTheDocument();
    expect(screen.getByText("Province identity")).toBeInTheDocument();
  });

  it("shows an unavailable state for provinces outside the released skeleton", async () => {
    renderAt("/province/not-a-real-province");

    expect(
      await screen.findByRole("heading", { name: "Province unavailable" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "This province route does not yet resolve to a released skeleton record.",
      ),
    ).toBeInTheDocument();
  });

  it("shows a loading state when province data is still being prepared", () => {
    render(
      <MemoryRouter>
        <HistoryContextProvider>
          <ProvincePage isLoading provinceId="shaanxi" />
        </HistoryContextProvider>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Loading province dossier" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Loading province")).toBeInTheDocument();
  });
});
