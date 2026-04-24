import { expect, test } from "@playwright/test";

test("homepage communicates a map-led history experience within first impression", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Enter Chinese history through the map" }),
  ).toBeVisible();
  await expect(page.getByText("National map entry")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Province routes" }),
  ).toBeVisible();
  await expect(
    page.getByText(/province-level regions are available in the national skeleton\./i),
  ).toBeVisible();
});
