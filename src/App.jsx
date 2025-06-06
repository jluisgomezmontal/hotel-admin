import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ReservationForm from "./pages/ReservationForm";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

function App({ toggleColorMode, mode }) {
  const location = useLocation();

  // No mostrar navbar en la ruta "/"
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar toggleColorMode={toggleColorMode} mode={mode} />}
      <Routes>
        <Route
          path="/"
          element={<Home toggleColorMode={toggleColorMode} mode={mode} />}
        />
        <Route path="/reservar" element={<ReservationForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
