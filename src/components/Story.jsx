import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const stories = [
  {
    number: "01",
    label: "The Founder",
    title: "A story that starts with a person.",
    description:
      "Endemix Nusantara lahir dari kecintaan terhadap kopi dan keinginan untuk membawa karakter kopi Cianjur lebih dekat kepada banyak orang.",
    image: "/images/story/owner.jpg",
  },
  {
    number: "02",
    label: "The Family",
    title: "Built with trust, grown together.",
    description:
      "Di balik perjalanan Endemix Nusantara, ada keluarga yang ikut menjaga semangat, nilai, dan konsistensi dari setiap langkah yang dijalankan.",
    image: "/images/story/family.jpg",
  },
  {
    number: "03",
    label: "The Team",
    title: "Every process is carried by people.",
    description:
      "Dari kebun hingga proses pengolahan, ada tim yang bekerja dengan perhatian untuk menjaga kualitas di setiap tahap.",
    image: "/images/story/team.jpg",
  },
  {
    number: "04",
    label: "The Coffee",
    title: "More than a bean, it carries a journey.",
    description:
      "Bagi Endemix Nusantara, setiap biji membawa cerita tentang tempat, proses, orang-orang, dan karakter rasa yang terbentuk dari perjalanan panjang.",
    image: "/images/story/coffee.jpg",
  },
];

function Story() {
  const [active, setActive] = useState(0);

  const current = stories[active];

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setActive((prev) =>
      prev === 0 ? stories.length - 1 : prev - 1
    );
  };

  return (
    <section
      id="story"
      className="min-h-[calc(100svh-76px)] overflow-hidden bg-[#17130f] px-5 py-10 text-[#f1ece2] sm:px-6 sm:py-12 lg:px-10 lg:py-5"
    >
      <div className="mx-auto flex min-h-[calc(100svh-116px)] max-w-[1400px] flex-col">
        {/* HEADER */}
        <div className="flex items-end justify-between border-b border-white/15 pb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#c49a44]">
              01 / Our Story
            </p>

            <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-4xl lg:text-[42px]">
              Behind Endemix Nusantara
            </h2>
          </div>

          <p className="hidden text-right text-[9px] uppercase tracking-[0.3em] text-white/30 sm:block">
            People / Place / Coffee
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid flex-1 gap-8 pt-6 lg:min-h-0 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* IMAGE SIDE */}
          <div className="relative">
            <div className="relative h-[430px] overflow-hidden bg-[#2c241d] sm:h-[500px] lg:h-[calc(100svh-185px)] lg:max-h-[680px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.image}
                  src={current.image}
                  alt={current.label}
                  initial={{
                    opacity: 0,
                    scale: 1.035,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.99,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
                <p className="text-[9px] uppercase tracking-[0.32em] text-white/55">
                  Endemix Nusantara
                </p>
              </div>
            </div>

            {/* IMAGE FOOTER */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-[9px] tracking-[0.28em] text-white/35">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(stories.length).padStart(2, "0")}
              </p>

              <div className="flex items-center gap-2">
                {stories.map((item, index) => (
                  <button
                    key={item.number}
                    onClick={() => setActive(index)}
                    aria-label={`Open ${item.label}`}
                    className={`h-[2px] transition-all duration-300 ${
                      active === index
                        ? "w-9 bg-[#c49a44]"
                        : "w-4 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* TEXT SIDE */}
          <div className="flex min-h-0 flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.number}
                initial={{
                  opacity: 0,
                  y: 22,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -16,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="pt-1 lg:pt-2"
              >
                <div className="flex items-center gap-4">
                  <p className="text-[9px] tracking-[0.3em] text-white/30">
                    {current.number}
                  </p>

                  <span className="h-px w-8 bg-[#c49a44]" />

                  <p className="text-[9px] uppercase tracking-[0.32em] text-[#c49a44]">
                    {current.label}
                  </p>
                </div>

                <h3 className="mt-6 max-w-xl text-4xl font-medium leading-[0.98] tracking-[-0.05em] sm:text-5xl lg:text-[62px] xl:text-[68px]">
                  {current.title}
                </h3>

                <p className="mt-6 max-w-lg text-sm leading-6 text-white/50 sm:text-[15px] sm:leading-7">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* BOTTOM NAV */}
            <div className="mt-10 border-t border-white/15 pt-5 lg:mt-8">
              <div className="flex items-center justify-between gap-6">
                <p className="hidden max-w-[250px] text-[9px] uppercase tracking-[0.28em] text-white/30 sm:block">
                  Discover the people behind the story
                </p>

                <div className="ml-auto flex gap-3">
                  <button
                    onClick={prevSlide}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-base transition hover:border-white/60 hover:bg-white hover:text-black"
                    aria-label="Previous story"
                  >
                    ←
                  </button>

                  <button
                    onClick={nextSlide}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-base transition hover:border-white/60 hover:bg-white hover:text-black"
                    aria-label="Next story"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Story;