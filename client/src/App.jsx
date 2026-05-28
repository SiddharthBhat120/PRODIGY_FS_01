import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#0d0d14",
              border: "1px solid #1a1a2e",
              color: "#e0e0f0",
              fontFamily: "'Syne', sans-serif",
              fontSize: "14px",
              borderRadius: "10px",
            },
            success: {
              iconTheme: { primary: "#43e8d8", secondary: "#050508" },
            },
            error: {
              iconTheme: { primary: "#ff6584", secondary: "#050508" },
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
