import { Button } from "@/components/ui/button";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button variant="destructive">Destructive</Button>

      <Routes>
        <Route path="/login" element={<h1>Hello Login</h1>} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Routes>
    </div>
  );
}

export default App;
