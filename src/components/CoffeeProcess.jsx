import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

const processData = [
  {
    number: "01",
    title: "Growing",
    subtitle: "Where it begins.",
    description:
      "Perjalanan dimulai dari tanaman kopi yang tumbuh di lingkungan yang ikut membentuk karakter setiap buah.",
    image: "",
  },
  {
    number: "02",
    title: "Harvesting",
    subtitle: "Picked at the right moment.",
    description:
      "Buah kopi dipanen pada tingkat kematangan yang tepat untuk menjaga kualitas sejak awal proses.",
    image: "",
  },
  {
    number: "03",
    title: "Drying",
    subtitle: "Time shapes character.",
    description:
      "Proses pengeringan dilakukan secara terkontrol untuk membantu membentuk karakter dan kualitas biji kopi.",
    image: "",
  },
  {
    number: "04",
    title: "Selection",
    subtitle: "Only the right beans remain.",
    description:
      "Biji kopi diseleksi untuk menjaga kualitas dan konsistensi sebelum melanjutkan ke tahap berikutnya.",
    image: "",
  },
];

const backgrounds = [
  "bg-[radial-gradient(circle_at_55%_30%,#65734a_0%,#293222_38%,#151a13_80%)]",
  "bg-[radial-gradient(circle_at_50%_35%,#8d4934_0%,#43281f_42%,#1b1511_82%)]",
  "bg-[radial-gradient(circle_at_50%_45%,#b58b53_0%,#59452c_40%,#201a14_82%)]",
  "bg-[radial-gradient(circle_at_45%_40%,#8c6b3e_0%,#3b2e20_42%,#17130f_82%)]",
];

function DesktopProcess() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let nextIndex = 0;

    if (latest >= 0.75) {
      nextIndex = 3;
    } else if (latest >= 0.5) {
      nextIndex = 2;
    } else if (latest >= 0.25) {
      nextIndex = 1;
    }

    setActiveIndex(nextIndex);
  });

  const current = processData[activeIndex];

  return (
    <div
      ref={sectionRef}
      className="relative hidden h-[400vh] lg:block"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid h-full grid-cols-2">
          {/* LEFT */}
          <div className="relative overflow-hidden bg-[#eee6d8] px-10 xl:px-16">
            <div className="absolute left-10 top-10 xl:left-16">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8f6825]">
                02 / Coffee Process
              </p>
            </div>

            <div className="flex h-full items-center">
              <div className="relative w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.number}
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -30,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <p className="text-[11px] tracking-[0.3em] text-black/35">
                      {current.number}
                    </p>

                    <h2 className="mt-5 text-[76px] font-medium leading-[0.88] tracking-[-0.065em] xl:text-[100px]">
                      {current.title}
                    </h2>

                    <p className="mt-7 text-lg italic text-[#9d7429]">
                      {current.subtitle}
                    </p>

                    <p className="mt-8 max-w-[440px] text-[15px] leading-7 text-black/50">
                      {current.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* progress */}
            <div className="absolute bottom-9 left-10 right-10 xl:left-16 xl:right-16">
              <div className="flex items-center gap-5">
                <div className="relative h-px flex-1 overflow-hidden bg-black/15">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-black"
                    animate={{
                      width: `${((activeIndex + 1) / processData.length) * 100}%`,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <p className="whitespace-nowrap text-[9px] uppercase tracking-[0.3em] text-black/35">
                  Scroll to explore
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative overflow-hidden bg-[#1b1611]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.number}
                initial={{
                  opacity: 0,
                  scale: 1.03,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 1.015,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                {current.image ? (
                  <img
                    src={current.image}
                    alt={current.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className={`h-full w-full ${backgrounds[activeIndex]}`}
                  />
                )}

                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute inset-x-0 bottom-0 p-10 text-white">
                  <div className="flex items-end justify-between border-t border-white/25 pt-5">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.32em] text-white/45">
                        Process
                      </p>

                      <p className="mt-2 text-2xl font-medium">
                        {current.number} / 04
                      </p>
                    </div>

                    <p className="text-xs text-white/40">
                      Cianjur, West Java
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileProcess() {
  return (
    <div className="lg:hidden">
      <div className="px-5 pb-12 pt-20 sm:px-6">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#8f6825]">
          02 / Coffee Process
        </p>

        <h2 className="mt-5 text-5xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl">
          The journey
          <br />
          behind the bean.
        </h2>
      </div>

      {processData.map((item, index) => (
        <motion.article
          key={item.number}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="border-t border-black/10 px-5 py-10 sm:px-6"
        >
          <div
            className={`relative aspect-[4/5] overflow-hidden ${
              backgrounds[index]
            }`}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            )}

            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-[10px] tracking-[0.3em] text-white/55">
                {item.number} / 04
              </p>
            </div>
          </div>

          <div className="pt-7">
            <p className="text-[10px] tracking-[0.25em] text-black/35">
              {item.number}
            </p>

            <h3 className="mt-3 text-4xl font-medium tracking-[-0.045em]">
              {item.title}
            </h3>

            <p className="mt-3 italic text-[#946c24]">
              {item.subtitle}
            </p>

            <p className="mt-5 max-w-md text-sm leading-7 text-black/50">
              {item.description}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function CoffeeProcess() {
  return (
    <section id="process" className="bg-[#eee6d8]">
      <DesktopProcess />
      <MobileProcess />
    </section>
  );
}

export default CoffeeProcess;