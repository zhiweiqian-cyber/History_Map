import type { RouteObject } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import { App } from "./App";
import { CityPage } from "../features/city/CityPage";
import { HomePage } from "../features/home/HomePage";
import { ProvincePage } from "../features/province/ProvincePage";

export function createAppRoutes(): RouteObject[] {
  return [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "province/:provinceId",
          element: <ProvincePage />,
        },
        {
          path: "city/:cityId",
          element: <CityPage />,
        },
      ],
    },
  ];
}

export const router = createBrowserRouter(createAppRoutes());
