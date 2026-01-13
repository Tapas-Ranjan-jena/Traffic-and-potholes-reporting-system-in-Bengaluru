import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateReport from "./pages/CreateReport";
import AdminDashboard from "./pages/AdminDashboard";
import EditReport from "./pages/EditReport";


const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "admin";
};

function App() {
  return (
    <div className="app-bg">
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-report" element={<CreateReport />} />
        <Route path="/edit-report/:id" element={<EditReport />} />

        {/* ✅ Admin Protected Route */}
        <Route
          path="/admin"
          element={
            isAdmin() ? <AdminDashboard /> : <Navigate to="/dashboard" replace />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
