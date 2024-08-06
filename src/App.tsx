import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "@/components/modules/header";
import { Footer } from "@/components/modules/footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";

export function App() {
  const me = useSelector((state: any) => state.auth.me);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "auth/authenticate" });
  }, []);

  return (
    <ScrollArea className="app-container">
      {/* Header Component */}
      <Header me={me} />

      {/* Routes */}
      <div className="main-content">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </ScrollArea>
  );
}
