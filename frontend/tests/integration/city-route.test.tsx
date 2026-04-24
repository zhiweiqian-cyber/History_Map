import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { App } from "../../src/app/App";
import { CityPage } from "../../src/features/city/CityPage";
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
            <Route element={<CityPage />} path="city/:cityId" />
          </Route>
        </Routes>
      </HistoryContextProvider>
    </MemoryRouter>,
  );
}

describe("city route", () => {
  it("shows city identity and province context on direct load", async () => {
    renderAt("/city/xian");

    expect(await screen.findByRole("heading", { name: "Xi'an" })).toBeInTheDocument();
    expect(screen.getByText("Parent province")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shaanxi" })).toBeInTheDocument();
    expect(
      screen.getByText("Xi'an concentrates the long capital tradition"),
    ).toBeInTheDocument();
  });

  it("lets a reader navigate back to the parent province from the city page", async () => {
    renderAt("/city/xian");

    expect(await screen.findByRole("heading", { name: "Xi'an" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: "Shaanxi" }));

    expect(await screen.findByRole("heading", { name: "Shaanxi" })).toBeInTheDocument();
    expect(screen.getByText("Province dossier")).toBeInTheDocument();
  });
});
