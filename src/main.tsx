import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { routes } from "@/routes";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={routes} />
    </ThemeProvider>
  </Provider>,
);
