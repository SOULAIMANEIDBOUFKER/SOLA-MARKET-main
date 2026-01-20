import toast from "react-hot-toast";
import { ShoppingCart, Sparkles, Ban } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useTranslation } from "react-i18next";

const categoryKeyMap = {
  "t-shirts": "tshirts",
};

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const isOutOfStock = Number(product?.stock ?? 1) === 0;
  const isFeatured = Boolean(product?.isFeatured);

  const categorySlug = String(product?.category || "").toLowerCase();
  const categoryKey = categoryKeyMap[categorySlug] || categorySlug;

  const handleAddToCart = () => {
    if (!user) {
      toast.error(
        t("product.pleaseLoginToAdd", { defaultValue: "Please login to add products to cart" }),
        { id: "login" }
      );
      return;
    }
    if (isOutOfStock) {
      toast.error(t("product.outOfStock", { defaultValue: "Out of stock" }), { id: "stock" });
      return;
    }
    addToCart(product);
    toast.success(t("cart.productAdded", { defaultValue: "Product added to cart" }), { id: "added" });
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-soft">
      {/* Badges */}
      <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">
        {isFeatured && !isOutOfStock && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur">
            <Sparkles size={12} />
            {t("product.featured", { defaultValue: "Featured" })}
          </span>
        )}

        {isOutOfStock && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 backdrop-blur">
            <Ban size={12} />
            {t("product.outOfStock", { defaultValue: "Out of stock" })}
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-black/20">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/65">
            {t(`categories.${categoryKey}`, { defaultValue: product.category })}
          </span>
        </div>

        <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-white">
          {product.name}
        </h3>

        <p className="mb-5 line-clamp-2 text-sm text-white/55">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-white/45">
              {t("product.price", { defaultValue: "Price" })}
            </div>
            <div className="text-2xl font-semibold text-white">
              ${Number(product.price).toFixed(2)}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={[
              "inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-white/10",
              isOutOfStock
                ? "cursor-not-allowed bg-white/5 text-white/35"
                : "bg-accent hover:bg-accent/90 text-white",
            ].join(" ")}
          >
            <ShoppingCart size={18} />
            {isOutOfStock
              ? t("product.unavailable", { defaultValue: "Unavailable" })
              : t("cart.addToCart", { defaultValue: "Add to cart" })}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
