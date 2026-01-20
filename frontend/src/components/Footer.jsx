import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative z-10 mt-14 border-t border-white/10 bg-[#0B1220]">
      <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
              <img
                src="/meine-logo.png"
                alt="SOLA-MARKET Logo"
                className="h-8 w-8 object-contain"
                draggable="false"
              />
            </div>

            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">
                Soulaimane Id Boufker
              </div>
              <div className="text-xs text-white/70">
                {t("footer.availability", {
                  defaultValue: "Offen für eine Ausbildung in Deutschland (2026)",
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://github.com/SOULAIMANEIDBOUFKER"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <Github size={16} />
              GitHub
            </a>

            <a
              href="mailto:soulaimaneidboufker@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <Mail size={16} />
              Email
            </a>

            <a
              href="https://www.linkedin.com/in/soulaimane-idboufker-92aab92aa"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Soulaimane Id Boufker.{" "}
            {t("footer.rights", { defaultValue: "Alle Rechte vorbehalten." })}
          </p>

          <p className="text-xs text-white/55">
            {t("footer.madeWith", { defaultValue: "Erstellt mit React + Tailwind" })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
