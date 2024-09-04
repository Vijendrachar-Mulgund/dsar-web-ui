import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { User } from "@/types/auth";
import { Role } from "@/enums/Role";
import { Header } from "@/components/modules/header";
import { Footer } from "@/components/modules/footer";
import { ScrollArea } from "@/components/ui/scroll-area";

export function App() {
  const me: User | null = useSelector((state: any) => state.auth.me) as User | null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "auth/authenticate" });
  }, []);

  useEffect(() => {
    if (me?.role == Role.admin) {
      navigate("/admin/dashboard");
    }

    if (me?.role == Role.teamLeader || Role.teamMember) {
      navigate("/case/list");
    }

    if (!me) {
      navigate("/login");
    }
  }, [me]);

  return (
    <ScrollArea className="app-container">
      {/* Header Component */}
      <Header me={me} />

      {/* Routes */}
      <div className="main-content hide-scrollbar">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />

      <Toaster />
    </ScrollArea>
  );
}
