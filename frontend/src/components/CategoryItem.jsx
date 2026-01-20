import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const CategoryItem = ({ category }) => {
  const { t } = useTranslation();

  return (
    <Link to={`/category${category.href}`} className="group block">
      <div className="relative h-80 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-soft">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-xs text-white/55">
            {t("home.collectionItemHint", { defaultValue: "Explore collection" })}
          </p>

          <div className="mt-1 flex items-end justify-between gap-4">
            <h3 className="text-2xl font-semibold text-white">{category.name}</h3>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition group-hover:bg-white/10">
              <ArrowUpRight className="text-white/75" size={18} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryItem;
