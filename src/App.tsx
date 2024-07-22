import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Header } from "./components/modules/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Routes>
    </div>
  );
}

export default App;
