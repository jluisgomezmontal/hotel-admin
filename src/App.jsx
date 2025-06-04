import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReservationForm from "./pages/ReservationForm";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

function App({ toggleColorMode, mode }) {
  return (
    <>
      <Navbar toggleColorMode={toggleColorMode} mode={mode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservar" element={<ReservationForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
