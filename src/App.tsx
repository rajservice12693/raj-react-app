import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./components/Home";
import LoginPage from "./components/pages/LoginPage";
import { ToastContainer } from "react-toastify";
import { JewelleryEntry } from "./components/pages/JewelleryEntry";
import { CategoryEntry } from "./components/pages/CategoryEntry";
import { MaterialEntry } from "./components/pages/MaterialEntry";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import ContactPage from "./components/pages/ContactPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/jewelleryEntry"
              element={
                <ProtectedRoute>
                  <JewelleryEntry />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/categoryEntry"
              element={
                <ProtectedRoute>
                  <CategoryEntry />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/materialEntry"
              element={
                <ProtectedRoute>
                  <MaterialEntry />
                </ProtectedRoute>
              }
            />
            
            {/* Catch all route - redirect to home for any undefined routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
