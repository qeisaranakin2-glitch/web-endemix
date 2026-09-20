import { motion } from "framer-motion";

import { useLanguage } from "../context/LanguageContext.jsx";
import translations from "../data/translations.js";

function Footer() {
  const { language } = useLanguage();

  const t = translations[language].footer;

  return (
    <footer className="bg-[#0f0c09] px-5 pb-8 pt-20 text-[#f1ece2] sm:px-6 md:pt-28 lg:px-10 lg:pt-32">
      <div className="mx-auto max-w-[1400px]">
        {/* TOP */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="border-b border-white/15 pb-16 md:pb-20"
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#c49a44]">
            {t.brand}
          </p>

          <div className="mt-7 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-[900px] text-5xl font-medium leading-[0.93] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[88px]">
              {t.title1}
              <br />

              <span className="italic text-[#d7a43b]">
                {t.title2}
              </span>
            </h2>

            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/pohon_kopi/"
                target="_blank"
                rel="noreferrer"
                className="group flex h-12 items-center gap-3 rounded-full border border-white/20 px-5 text-sm transition hover:bg-white hover:text-black"
              >
                {t.instagram}

                <span className="transition duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=6287823404009"
                target="_blank"
                rel="noreferrer"
                className="group flex h-12 items-center gap-3 rounded-full border border-white/20 px-5 text-sm transition hover:bg-white hover:text-black"
              >
                {t.whatsapp}

                <span className="transition duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM */}
        <div className="flex flex-col gap-6 py-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
              {t.location}
            </p>

            <p className="mt-2 text-xs text-white/30">
              {t.tagline}
            </p>
          </div>

          <div className="flex items-center gap-5 text-[10px] uppercase tracking-[0.28em] text-white/30">
            <a
              href="#"
              className="transition hover:text-white"
            >
              Top ↑
            </a>

            <p>
              © {new Date().getFullYear()} Pohon Kopi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;