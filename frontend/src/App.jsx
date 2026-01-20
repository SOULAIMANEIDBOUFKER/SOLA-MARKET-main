import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";
import { useEffect, useState } from "react";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;
    getCartItems();
  }, [getCartItems, user]);

  useEffect(() => {
    setLoading(checkingAuth);
  }, [checkingAuth]);

  if (loading) return <LoadingSpinner />;

  return (
    <div
      id="top"
      className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white relative overflow-hidden"
    >
      {/* ✅ Background layer (always behind) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/6 via-transparent to-emerald-900/6" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/6 via-transparent to-blue-900/6" />

        {/* Animated orbs */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />

        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* ✅ Content layer (always above background) */}
      <div className="relative z-10">
        <Navbar />

        <main className="pt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
                <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
                <Route
                  path="/secret-dashboard"
                  element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />}
                />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
                <Route
                  path="/purchase-success"
                  element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
                />
                <Route
                  path="/purchase-cancel"
                  element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
                />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>

        
        <Footer />
      </div>

      {/* Toaster */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1F2937",
            color: "#fff",
            border: "1px solid #374151",
            borderRadius: "12px",
            backdropFilter: "blur(10px)",
          },
          success: { style: { background: "#065F46", border: "1px solid #047857" } },
          error: { style: { background: "#7F1D1D", border: "1px solid #991B1B" } },
        }}
      />

      {/* Loading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 w-0">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-emerald-500 to-transparent blur-sm" />
        </div>
      </div>
    </div>
  );
}

export default App;
