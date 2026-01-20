import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowLeft, Package, Shield, Truck, RefreshCw } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const CartPage = () => {
  const { cart } = useCartStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [animateEmptyCart, setAnimateEmptyCart] = useState(false);

  useEffect(() => {
    if (cart.length === 0) setAnimateEmptyCart(true);
  }, [cart]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/5 via-transparent to-emerald-900/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            {t("cart.back", { defaultValue: "Back" })}
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {t("cart.title", { defaultValue: "Your Shopping Cart" })}
              </h1>
              <p className="mt-2 text-gray-400">
                {t("cart.subtitle", { defaultValue: "Review and manage your items" })}
              </p>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield size={16} className="text-emerald-400" />
                {t("cart.secureCheckout", { defaultValue: "Secure checkout" })}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Truck size={16} className="text-emerald-400" />
                {t("cart.freeShippingLabel", { defaultValue: "Free shipping" })}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <RefreshCw size={16} className="text-emerald-400" />
                {t("cart.easyReturns", { defaultValue: "Easy returns" })}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          {/* Main cart items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <AnimatePresence mode="wait">
              {cart.length === 0 ? (
                <EmptyCartUI animate={animateEmptyCart} />
              ) : (
                <>
                  {/* Cart items */}
                  <motion.div layout className="space-y-6">
                    {cart.map((item, index) => (
                      <CartItem key={`${item._id}-${index}`} item={item} />
                    ))}
                  </motion.div>

                  {/* Trust badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-6"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                          <Truck className="text-emerald-400" size={24} />
                        </div>
                        <div className="text-sm font-medium text-white">
                          {t("cart.trust.freeShippingTitle", { defaultValue: "Free Shipping" })}
                        </div>
                        <div className="text-xs text-gray-400">
                          {t("cart.trust.freeShippingHint", { defaultValue: "Over $50" })}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                          <RefreshCw className="text-emerald-400" size={24} />
                        </div>
                        <div className="text-sm font-medium text-white">
                          {t("cart.trust.returnsTitle", { defaultValue: "30-Day Returns" })}
                        </div>
                        <div className="text-xs text-gray-400">
                          {t("cart.trust.returnsHint", { defaultValue: "Easy & Free" })}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                          <Shield className="text-emerald-400" size={24} />
                        </div>
                        <div className="text-sm font-medium text-white">
                          {t("cart.trust.securePaymentTitle", { defaultValue: "Secure Payment" })}
                        </div>
                        <div className="text-xs text-gray-400">
                          {t("cart.trust.securePaymentHint", { defaultValue: "256-bit SSL" })}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                          <Package className="text-emerald-400" size={24} />
                        </div>
                        <div className="text-sm font-medium text-white">
                          {t("cart.trust.qualityTitle", { defaultValue: "Quality Guarantee" })}
                        </div>
                        <div className="text-xs text-gray-400">
                          {t("cart.trust.qualityHint", { defaultValue: "Premium Products" })}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* People also bought */}
                  <PeopleAlsoBought />
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sidebar */}
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-6"
              >
                <OrderSummary />
                <GiftCouponCard />

                {/* Continue shopping */}
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {t("cart.needMore", { defaultValue: "Need more?" })}
                  </h3>
                  <Link
                    to="/"
                    className="group flex items-center justify-center gap-2 w-full rounded-xl bg-white/5 hover:bg-white/10 py-3 text-gray-300 hover:text-white transition-all"
                  >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    {t("cart.continueShoppingBtn", { defaultValue: "Continue Shopping" })}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

/* ================= EMPTY CART ================= */

const EmptyCartUI = ({ animate }) => {
  const { t } = useTranslation();

  // ✅ Use your real categories (same slugs you use in the app)
  const popularCategories = [
    { slug: "jeans", labelKey: "categories.jeans", fallback: "Jeans" },
    { slug: "t-shirts", labelKey: "categories.tshirts", fallback: "T-Shirts" },
    { slug: "shoes", labelKey: "categories.shoes", fallback: "Shoes" },
    { slug: "jackets", labelKey: "categories.jackets", fallback: "Jackets" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={animate ? { opacity: 1, scale: 1 } : {}}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-12 text-center"
    >
      {/* Animated background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full opacity-20 blur-xl" />
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            <ShoppingCart className="w-16 h-16 text-emerald-400" />
          </div>
        </div>
      </motion.div>

      <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
        {t("cart.emptyTitle")}
      </h3>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">{t("cart.emptySubtitle")}</p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-white font-semibold hover:shadow-xl hover:shadow-emerald-500/25 transition-all"
        >
          <span className="relative flex items-center justify-center gap-2">
            {t("cart.startShopping", { defaultValue: "Start Shopping" })}
            <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" size={18} />
          </span>
        </Link>

        <Link
          to="/new-arrivals"
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-gray-300 hover:text-white font-semibold hover:bg-white/10 transition-all"
        >
          <span className="relative flex items-center justify-center gap-2">
            {t("cart.viewNewArrivals", { defaultValue: "View New Arrivals" })}
            <svg className="w-5 h-5 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </Link>
      </div>

      {/* Popular categories */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <p className="text-gray-400 mb-6">{t("cart.popularCategories", { defaultValue: "Popular Categories" })}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularCategories.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className="rounded-lg bg-white/5 hover:bg-white/10 p-4 text-center transition-colors"
            >
              <div className="text-sm font-medium text-white mb-1">
                {t(c.labelKey, { defaultValue: c.fallback })}
              </div>
              <div className="text-xs text-gray-400">{t("cart.shopNow", { defaultValue: "Shop now" })}</div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
