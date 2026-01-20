import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProductsList = () => {
  const { t } = useTranslation();
  const { deleteProduct, toggleFeaturedProduct, fetchAllProducts, adminProducts, loading } =
    useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">{t("admin.productsTab")}</h2>
          <p className="text-sm text-white/60">
            {loading ? t("common.loading") : `${adminProducts.length} ${t("admin.productsTab")}`}
          </p>
        </div>
      </div>

      {adminProducts.length === 0 && !loading ? (
        <div className="rounded-xl border border-white/10 bg-black/20 p-6 text-white/70">
          {t("categoryPage.noProducts")}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-black/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/70">
                  {t("admin.product")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/70">
                  {t("admin.category")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/70">
                  {t("admin.price")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/70">
                  {t("admin.featured")}
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-white/70">
                  {t("admin.actions")}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10 bg-black/10">
              {adminProducts.map((product) => (
                <tr key={product._id} className="hover:bg-white/5 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-12 w-12 rounded-lg object-cover border border-white/10"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-white">{product.name}</p>
                        <p className="truncate text-xs text-white/50">{product._id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-sm text-white/80">{product.category}</td>

                  <td className="px-4 py-3 text-sm font-semibold text-emerald-200">
                    ${Number(product.price).toFixed(2)}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFeaturedProduct(product._id)}
                      className={[
                        "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition",
                        product.isFeatured
                          ? "bg-emerald-600/20 text-emerald-200 hover:bg-emerald-600/25"
                          : "bg-white/5 text-white/70 hover:bg-white/10",
                      ].join(" ")}
                      title={product.isFeatured ? "Featured" : "Not featured"}
                    >
                      <Star size={18} className={product.isFeatured ? "fill-emerald-300" : ""} />
                      {product.isFeatured ? "Yes" : "No"}
                    </button>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="inline-flex items-center gap-2 rounded-xl bg-rose-600/20 px-3 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-600/30"
                    >
                      <Trash size={18} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default ProductsList;
