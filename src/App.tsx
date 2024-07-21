import { Button } from "@/components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <h1>Home One</h1>,
    },
    {
      path: "/login",
      element: <h1>Login</h1>,
    },
    {
      path: "/profile",
      element: <h1>Profile</h1>,
    },
    {
      path: "/dashboard",
      element: <h1>Dashboard</h1>,
    },
    {
      path: "*",
      element: <h1>Not Found</h1>,
    },
  ]);
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button variant="destructive">Destructive</Button>

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
