import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { Admin } from "./pages/admin/index.tsx";
import { Dashboard } from "./pages/admin/dashboard/index.tsx";
import { CreateNewAccount } from "./pages/admin/create-new-account/index.tsx";
import { Login } from "./pages/login/index.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "create-new-account",
            element: <CreateNewAccount />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
);
