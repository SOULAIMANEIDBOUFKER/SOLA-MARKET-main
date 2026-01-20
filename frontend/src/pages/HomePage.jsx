import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";
import ProductRail from "../components/ProductRail";
import MiniProductCard from "../components/MiniProductCard";
import { useProductStore } from "../stores/useProductStore";
import { useTranslation } from "react-i18next";

const categories = [
  { href: "/jeans", nameKey: "categories.jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", nameKey: "categories.tshirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", nameKey: "categories.shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", nameKey: "categories.glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", nameKey: "categories.jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", nameKey: "categories.suits", imageUrl: "/suits.jpg" },
  { href: "/bags", nameKey: "categories.bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
  const { t } = useTranslation();

  const {
    fetchNewProducts,
    newProducts,
    fetchFeaturedProducts,
    featuredProducts,
    loading,
  } = useProductStore();

  useEffect(() => {
    fetchNewProducts(10);
    fetchFeaturedProducts();
  }, [fetchNewProducts, fetchFeaturedProducts]);

  const mappedCategories = categories.map((c) => ({
    href: c.href,
    name: t(c.nameKey),
    imageUrl: c.imageUrl,
  }));

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero (simple) */}
        <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur">
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-emerald-300 sm:text-6xl">
            {t("home.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/70">
            {t("home.subtitle")}
          </p>

          {/* Trust line (small, premium) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/55">
            <span>• {t("cart.freeShippingLabel", { defaultValue: "Free shipping" })}</span>
            <span>• {t("cart.easyReturns", { defaultValue: "Easy returns" })}</span>
            <span>• {t("cart.secureCheckout", { defaultValue: "Secure checkout" })}</span>
          </div>
        </div>

        {/* NEW ARRIVALS as Rail */}
        <ProductRail
          title={t("home.newArrivalsTitle", { defaultValue: "New Arrivals" })}
          subtitle={t("home.newArrivalsHint", { defaultValue: "Latest products added to the store." })}
          products={newProducts}
          isLoading={loading}
          emptyText={t("home.noNewProducts", { defaultValue: "No products yet." })}
          renderItem={(p) => <MiniProductCard product={p} />}
        />

        {/* Categories */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white">{t("home.categoriesTitle")}</h2>
          <p className="mt-1 text-sm text-white/60">{t("home.categoriesHint")}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mappedCategories.map((category) => (
            <CategoryItem category={category} key={category.href} />
          ))}
        </div>

        {/* Featured ONLY (no fallback to avoid duplicates) */}
        <div className="mt-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">{t("home.featuredTitle")}</h2>
            <p className="mt-1 text-sm text-white/60">{t("home.featuredHint")}</p>
          </div>

          {!loading && featuredProducts.length > 0 ? (
            <FeaturedProducts products={featuredProducts} />
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
              {t("home.noFeatured", { defaultValue: "No featured products yet." })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
