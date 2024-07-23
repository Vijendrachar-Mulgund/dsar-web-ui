import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Header } from "./components/modules/Header";
import { Footer } from "./components/modules/Footer";
import { ThemeProvider } from "./components/modules/Theme-Provider";
import { ScrollArea } from "./components/ui/scroll-area";

function App() {
  return (
    <div>
      <ScrollArea className="h-screen">
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </ScrollArea>
    </div>
  );
}

export default App;
