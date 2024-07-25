import { Outlet } from "react-router-dom";
import { Header } from "@/components/modules/Header";
import { Footer } from "@/components/modules/Footer";
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
