import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Languages, Check } from "lucide-react";

const LANGS = [
  { code: "en", label: "EN", name: "English" },
  { code: "de", label: "DE", name: "Deutsch" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const current = useMemo(() => {
    const code = (i18n.language || "en").split("-")[0];
    return LANGS.find((l) => l.code === code) || LANGS[0];
  }, [i18n.language]);

  useEffect(() => {
    const onClickOutside = (e) => {
      const el = document.getElementById("lang-switcher");
      if (el && !el.contains(e.target)) setOpen(false);
    };
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  }, []);

  const changeLang = async (code) => {
    await i18n.changeLanguage(code);
    localStorage.setItem("i18nextLng", code);
    setOpen(false);
  };

  return (
    <div id="lang-switcher" className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 shadow-sm backdrop-blur transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-emerald-300/30"
        aria-haspopup="menu"
        aria-expanded={open}
        title="Language"
      >
        <Languages size={18} />
        <span className="tracking-wide">{current.label}</span>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220]/95 shadow-2xl backdrop-blur"
          role="menu"
        >
          <div className="p-2">
            {LANGS.map((lang) => {
              const active = lang.code === current.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => changeLang(lang.code)}
                  className={[
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition",
                    active
                      ? "bg-emerald-600/20 text-emerald-200"
                      : "text-white/80 hover:bg-white/5",
                  ].join(" ")}
                  role="menuitem"
                >
                  <span className="flex flex-col">
                    <span className="font-semibold">{lang.name}</span>
                    <span className="text-xs text-white/50">{lang.label}</span>
                  </span>
                  {active && <Check size={18} className="text-emerald-300" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
