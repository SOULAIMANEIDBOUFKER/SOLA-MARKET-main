import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { useTranslation } from "react-i18next";

const CategoryPage = () => {
  const { t } = useTranslation();
  const { fetchProductsByCategory, categoryProducts, loading } = useProductStore();
  const { category } = useParams();

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

  const title = category ? category.charAt(0).toUpperCase() + category.slice(1) : "";

  return (
    <div className="min-h-screen">
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.h1
          className="mb-8 text-center text-3xl sm:text-5xl font-semibold text-white"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          {title}
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          {!loading && categoryProducts?.length === 0 && (
            <h2 className="col-span-full text-center text-2xl font-semibold text-white/70">
              {t("categoryPage.noProducts", { defaultValue: "No products found." })}
            </h2>
          )}

          {categoryProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;
