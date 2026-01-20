import { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductRail = ({
  title,
  subtitle,
  products = [],
  renderItem,
  emptyText = "No products yet.",
  isLoading = false,
}) => {
  const scrollerRef = useRef(null);

  const canShow = useMemo(() => Array.isArray(products) && products.length > 0, [products]);

  const scrollByPx = (px) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: px, behavior: "smooth" });
  };

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-white/60">{subtitle}</p> : null}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByPx(-520)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByPx(520)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
          Loading...
        </div>
      ) : !canShow ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
          {emptyText}
        </div>
      ) : (
        <div
          ref={scrollerRef}
          className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth rounded-2xl border border-white/10 bg-white/[0.03] p-4"
        >
          {products.map((p) => (
            <div key={p._id} className="min-w-[240px] max-w-[240px]">
              {renderItem(p)}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductRail;
