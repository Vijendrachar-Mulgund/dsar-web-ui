import { Outlet } from "react-router-dom";
import { Header } from "@/components/modules/header";
import { Footer } from "@/components/modules/footer";
import { ScrollArea } from "@/components/ui/scroll-area";

export function App() {
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
