import App from "@/App";
import { Admin } from "@/pages/admin";
import { CreateNewAccount } from "@/pages/admin/create-new-account";
import { Dashboard } from "@/pages/admin/dashboard";
import { Login } from "@/pages/login";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
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
