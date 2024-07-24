import { Outlet } from "react-router-dom";
import { Header } from "./components/modules/Header";
import { Footer } from "./components/modules/Footer";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { ScrollArea } from "./components/ui/scroll-area";

function App() {
  return (
    <ScrollArea className="h-screen">
      {/* The Shadcn/ui Theme Provider */}
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        {/* Header Component */}
        <Header />

        {/* Routes */}
        <div className="pt-20">
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </ThemeProvider>
    </ScrollArea>
  );
}

export default App;
