import { Outlet } from "react-router-dom";
import { Header } from "./components/modules/Header";
import { Footer } from "./components/modules/Footer";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { ScrollArea } from "./components/ui/scroll-area";

export function App() {
  return (
    <ScrollArea>
      {/* The Shadcn/ui Theme Provider */}
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        {/* Header Component */}
        <Header />

        {/* Routes */}
        <div className="mt-20 mb-6">
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </ThemeProvider>
    </ScrollArea>
  );
}
