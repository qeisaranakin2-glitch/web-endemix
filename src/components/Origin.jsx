import { motion } from "framer-motion";

import { useLanguage } from "../context/LanguageContext.jsx";
import translations from "../data/translations.js";

function Origin() {
  const { language } = useLanguage();

  const t = translations[language].origin;

  return (
    <section
      id="origin"
      className="bg-[#17130f] px-5 py-24 text-[#f1ece2] sm:px-6 md:py-32 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          {/* TEXT */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#c49a44]">
              03 / {t.section}
            </p>

            <motion.h2
              initial={{
                opacity: 0,
                y: 30,
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
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 text-5xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-7xl"
            >
              {t.title1}
              <br />
              {t.title2}
              <br />
              {t.title3}
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
                y: 18,
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
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 max-w-md text-sm leading-7 text-white/50 sm:text-base"
            >
              {t.description}
            </motion.p>
          </div>

          {/* VISUAL */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative aspect-[16/10] overflow-hidden bg-[#30291f]"
          >
            {/* nanti ganti dengan foto origin */}
            <img
              src="/images/origin/origin-main.jpg"
              alt={`${t.place1}, ${t.place2}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-9">
              <div className="flex items-end justify-between border-t border-white/25 pt-5">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">
                    {t.label}
                  </p>

                  <p className="mt-2 text-2xl">
                    {t.place1}
                    <br />
                    {t.place2}
                  </p>
                </div>

                <p className="max-w-[180px] text-right text-xs leading-5 text-white/40">
                  {t.caption}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Origin;