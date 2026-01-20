import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCart, LogIn, UserPlus, LogOut, Shield, Menu, X } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();

  const isAdmin = user?.role === "admin";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? "bg-bg/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between ${scrolled ? "py-3" : "py-5"}`}>
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
              <img
                src="/meine-logo.png"
                alt="SOLA-MARKET Logo"
                className="h-8 w-8 object-contain"
                draggable="false"
              />
            </div>

            <div className="leading-tight">
              <div className="text-base font-semibold text-text">
                {t("nav.brand", { defaultValue: "SOLA-MARKET" })}
              </div>
              <div className="text-xs text-white/50">
                {t("nav.tag", { defaultValue: "Premium Store" })}
              </div>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {user && (
              <Link to="/cart" className="relative">
                <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-center">
                  <ShoppingCart size={18} className="text-white/80" />
                </div>
                {cart?.length > 0 && (
                  <div className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-accent text-white text-[11px] font-bold flex items-center justify-center">
                    {cart.length}
                  </div>
                )}
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="hidden sm:flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm font-medium text-white/85 transition"
              >
                <Shield size={16} className="text-white/75" />
                {t("nav.dashboard", { defaultValue: "Dashboard" })}
              </Link>
            )}

            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <div className="h-8 w-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                    
                    <img
                      src="/meine-logo.png"
                      alt="Avatar"
                      className="h-6 w-6 object-contain opacity-90"
                      draggable="false"
                    />
                  </div>
                  <span className="text-sm text-white/80 font-medium">{user?.name}</span>
                </div>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm font-medium text-white/85 transition"
                >
                  <LogOut size={16} />
                  {t("nav.logout", { defaultValue: "Logout" })}
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm font-medium text-white/85 transition"
                >
                  <LogIn size={16} />
                  {t("nav.login", { defaultValue: "Login" })}
                </Link>

                <Link
                  to="/signup"
                  className="flex items-center gap-2 rounded-xl bg-accent hover:bg-accent/90 px-4 py-2 text-sm font-semibold text-white transition"
                >
                  <UserPlus size={16} />
                  {t("nav.signup", { defaultValue: "Sign up" })}
                </Link>
              </div>
            )}

            {/* Mobile */}
            <button
              className="sm:hidden h-10 w-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-center"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} className="text-white/80" /> : <Menu size={18} className="text-white/80" />}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className="sm:hidden pb-5">
            <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
              <LanguageSwitcher />

              {user ? (
                <>
                  <Link
                    to="/cart"
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/85"
                  >
                    <span className="flex items-center gap-3">
                      <ShoppingCart size={18} />
                      {t("nav.cart", { defaultValue: "Cart" })}
                    </span>
                    <span className="text-xs text-white/60">{cart?.length || 0}</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/secret-dashboard"
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/85"
                    >
                      <Shield size={18} />
                      {t("nav.dashboard", { defaultValue: "Dashboard" })}
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/85"
                  >
                    <LogOut size={18} />
                    {t("nav.logout", { defaultValue: "Logout" })}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/85"
                  >
                    <LogIn size={18} />
                    {t("nav.login", { defaultValue: "Login" })}
                  </Link>

                  <Link
                    to="/signup"
                    className="flex items-center gap-3 rounded-xl bg-accent px-4 py-3 text-white font-semibold"
                  >
                    <UserPlus size={18} />
                    {t("nav.signup", { defaultValue: "Sign up" })}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
