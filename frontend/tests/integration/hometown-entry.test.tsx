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

describe("hometown entry", () => {
  it("lets a visitor choose a province and featured city from the homepage", async () => {
    renderAt("/");

    fireEvent.change(screen.getByLabelText("Choose a province"), {
      target: { value: "shaanxi" },
    });
    fireEvent.change(screen.getByLabelText("Choose a featured city"), {
      target: { value: "xian" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Open featured city" }));

    expect(await screen.findByRole("heading", { name: "Xi'an" })).toBeInTheDocument();
    expect(screen.getByText("Parent province")).toBeInTheDocument();
    expect(screen.getByText("Former capital and western gateway city.")).toBeInTheDocument();
  });

  it("shows a limited state for provinces without featured cities", () => {
    renderAt("/");

    fireEvent.change(screen.getByLabelText("Choose a province"), {
      target: { value: "gansu" },
    });

    expect(
      screen.getByRole("heading", {
        name: "No hometown city is released yet for Gansu",
      }),
    ).toBeInTheDocument();
  });
});
