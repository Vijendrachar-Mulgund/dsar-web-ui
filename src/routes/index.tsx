import { createBrowserRouter } from "react-router-dom";

import { App } from "@/App";
import { Admin } from "@/pages/admin";
import { CreateNewAccount } from "@/pages/admin/create-new-account";
import { Dashboard } from "@/pages/admin/dashboard";
import { Case } from "@/pages/case";
import { CaseDetail } from "@/pages/case/case-detail";
import { CaseList } from "@/pages/case/case-list";
import { Login } from "@/pages/login";
import { NotFound } from "@/pages/not-found";

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
      {
        path: "case",
        element: <Case />,
        children: [
          {
            path: "list",
            element: <CaseList />,
          },

          {
            path: "detail/:caseId",
            element: <CaseDetail />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
