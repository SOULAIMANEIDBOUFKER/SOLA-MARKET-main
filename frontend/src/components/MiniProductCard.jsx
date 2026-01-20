import toast from "react-hot-toast";
import { ShoppingCart, Sparkles, Ban } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useTranslation } from "react-i18next";

const categoryKeyMap = {
  "t-shirts": "tshirts",
};

const MiniProductCard = ({ product }) => {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const isOutOfStock = Number(product?.stock ?? 1) === 0;
  const isFeatured = Boolean(product?.isFeatured);

  const categorySlug = String(product?.category || "").toLowerCase();
  const categoryKey = categoryKeyMap[categorySlug] || categorySlug;

  const handleAddToCart = () => {
    if (!user) {
      toast.error(t("product.pleaseLoginToAdd", { defaultValue: "Please login to add products to cart" }), {
        id: "login",
      });
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
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-black/20">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
          {isFeatured && !isOutOfStock ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/85 backdrop-blur">
              <Sparkles size={12} />
              {t("product.featured", { defaultValue: "Featured" })}
            </span>
          ) : null}

          {isOutOfStock ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/70 backdrop-blur">
              <Ban size={12} />
              {t("product.outOfStock", { defaultValue: "Out of stock" })}
            </span>
          ) : null}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/65">
            {t(`categories.${categoryKey}`, { defaultValue: product.category })}
          </span>

          <div className="text-right">
            <div className="text-[11px] text-white/45">
              {t("product.price", { defaultValue: "Price" })}
            </div>
            <div className="text-lg font-semibold text-white">
              ${Number(product.price).toFixed(2)}
            </div>
          </div>
        </div>

        <h3 className="line-clamp-1 text-sm font-semibold text-white">{product.name}</h3>
        <p className="mt-1 line-clamp-1 text-xs text-white/55">{product.description}</p>

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={[
            "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition",
            "focus:outline-none focus:ring-4 focus:ring-white/10",
            isOutOfStock ? "cursor-not-allowed bg-white/5 text-white/35" : "bg-accent text-white hover:bg-accent/90",
          ].join(" ")}
        >
          <ShoppingCart size={16} />
          {isOutOfStock
            ? t("product.unavailable", { defaultValue: "Unavailable" })
            : t("cart.addToCart", { defaultValue: "Add to cart" })}
        </button>
      </div>
    </div>
  );
};

export default MiniProductCard;
