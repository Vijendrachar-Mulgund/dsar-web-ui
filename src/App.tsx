import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
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
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        </Routes>

        {/* Footer */}
        <Footer />
      </ThemeProvider>
    </ScrollArea>
  );
}

export default App;
