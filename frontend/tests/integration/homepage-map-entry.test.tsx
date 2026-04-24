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

describe("homepage map entry", () => {
  it("lets a visitor enter a province from the homepage", async () => {
    renderAt("/");

    expect(
      screen.getByRole("heading", { name: "Enter Chinese history through the map" }),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Open Shaanxi province" }),
    );

    expect(
      await screen.findByRole("heading", { name: "Shaanxi" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Active dynastic segment")).toBeInTheDocument();
  });
});
