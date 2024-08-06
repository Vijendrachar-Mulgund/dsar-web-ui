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
import { AuthGuard } from "./authGuard";
import { Role } from "@/enums/Role";

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
        element: (
          <AuthGuard roles={Role.admin}>
            <Admin />
          </AuthGuard>
        ),
        children: [
          {
            path: "create-new-account",
            element: (
              <AuthGuard roles={[Role.admin]}>
                <CreateNewAccount />
              </AuthGuard>
            ),
          },
          {
            path: "dashboard",
            element: (
              <AuthGuard roles={[Role.admin]}>
                <Dashboard />
              </AuthGuard>
            ),
          },
        ],
      },
      {
        path: "case",
        element: <Case />,
        children: [
          {
            path: "list",
            element: (
              <AuthGuard roles={[Role.teamLeader, Role.teamMember]}>
                <CaseList />
              </AuthGuard>
            ),
          },

          {
            path: "detail/:caseId",
            element: (
              <AuthGuard roles={[Role.teamLeader, Role.teamMember]}>
                <CaseDetail />
              </AuthGuard>
            ),
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
