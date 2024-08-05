import { Outlet } from "react-router-dom";
import { Header } from "@/components/modules/header";
import { Footer } from "@/components/modules/footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getUserFetch } from "@/store/slices/user";

export function App() {
  const users = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFetch());
  }, [dispatch]);

  console.log(users);

  return (
    <ScrollArea className="app-container">
      {/* Header Component */}
      <Header />

      {/* Routes */}
      <div className="main-content">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </ScrollArea>
  );
}
