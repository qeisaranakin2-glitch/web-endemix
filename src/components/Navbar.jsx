import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import translations from "../data/translations.js";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { language, setLanguage } = useLanguage();

  const t = translations[language];

  const menu = [
    { label: t.navbar.story, href: "#story" },
    { label: t.navbar.process, href: "#process" },
    { label: t.navbar.origin, href: "#origin" },
    { label: t.navbar.products, href: "#products" },
    { label: t.navbar.gallery, href: "#gallery" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-black/10 text-white backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 sm:px-6 lg:px-10">
        {/* BRAND */}
        <a href="#" className="flex items-center gap-3">
         <div className="flex items-center">
  <img
    src="/images/logo/logo.png"
    alt="Endemix Nusantara"
    className="h-12 w-auto object-contain sm:h-14"
  />
</div>

          <div className="leading-none">
            <p className="text-[13px] font-semibold tracking-[0.18em]">
              Endemix Nusantara
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-[0.24em] text-white/45">
              Cianjur, West Java
            </p>
          </div>
        </a>

        {/* DESKTOP MENU */}
        <nav className="hidden items-center gap-7 text-[13px] lg:flex">
          {menu.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white/75 transition hover:text-[#e1aa30]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* LANGUAGE */}
          <div className="hidden items-center rounded-full border border-white/20 bg-white/5 p-1 sm:flex">
            <button
              type="button"
              onClick={() => setLanguage("id")}
              className={`rounded-full px-3 py-1.5 text-[10px] font-medium transition ${
                language === "id"
                  ? "bg-white text-black"
                  : "text-white/50 hover:text-white"
              }`}
            >
              ID
            </button>

            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-full px-3 py-1.5 text-[10px] font-medium transition ${
                language === "en"
                  ? "bg-white text-black"
                  : "text-white/50 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          {/* INSTAGRAM */}
          <a
            href="https://www.instagram.com/pohon_kopi/"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 text-[13px] text-white/80 sm:flex"
          >
            <span>{t.navbar.instagram}</span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition hover:bg-white hover:text-black">
              ↗
            </span>
          </a>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 lg:hidden"
            aria-label="Toggle menu"
          >
            <span className="text-xl">
              {open ? "×" : "≡"}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.22,
            }}
            className="border-t border-white/15 bg-[#17130f]/95 px-5 py-6 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-5">
              {menu.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-medium tracking-[-0.03em] text-white"
                >
                  {item.label}
                </a>
              ))}

              {/* MOBILE LANGUAGE */}
              <div className="mt-2 border-t border-white/10 pt-5">
                <p className="mb-3 text-[9px] uppercase tracking-[0.3em] text-white/35">
                  Language
                </p>

                <div className="flex w-fit items-center rounded-full border border-white/20 p-1">
                  <button
                    type="button"
                    onClick={() => setLanguage("id")}
                    className={`rounded-full px-4 py-2 text-xs transition ${
                      language === "id"
                        ? "bg-white text-black"
                        : "text-white/50"
                    }`}
                  >
                    Indonesia
                  </button>

                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`rounded-full px-4 py-2 text-xs transition ${
                      language === "en"
                        ? "bg-white text-black"
                        : "text-white/50"
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <a
                  href="https://www.instagram.com/pohon_kopi/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/50"
                >
                  {t.navbar.instagram} ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;