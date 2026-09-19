import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

const heroImages = [
  {
    src: "/images/hero/hero-farm.jpg",
    label: "The Origin",
  },
  {
    src: "/images/hero/hero-cherry.jpg",
    label: "The Cherry",
  },
  {
    src: "/images/hero/hero-drying.jpg",
    label: "The Drying",
  },
  {
    src: "/images/hero/hero-beans.jpg",
    label: "The Beans",
  },
];

function Hero() {
  const [activeImage, setActiveImage] = useState(0);
  const reduceMotion = useReducedMotion();

  // preload gambar berikutnya setelah halaman sudah mulai tampil
  useEffect(() => {
    const preloadImages = () => {
      heroImages.slice(1).forEach((item) => {
        const img = new Image();
        img.src = item.src;
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preloadImages);

      return () => {
        window.cancelIdleCallback(idleId);
      };
    }

    const timeout = setTimeout(preloadImages, 1200);

    return () => clearTimeout(timeout);
  }, []);

  // slideshow hanya jalan saat tab aktif
  useEffect(() => {
    let interval;

    const startSlideshow = () => {
      clearInterval(interval);

      interval = setInterval(() => {
        setActiveImage((prev) => {
          return (prev + 1) % heroImages.length;
        });
      }, 5000);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        clearInterval(interval);
      } else {
        startSlideshow();
      }
    };

    startSlideshow();

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      clearInterval(interval);

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  const currentImage = heroImages[activeImage];

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#17130f] text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={currentImage.src}
            src={currentImage.src}
            alt={currentImage.label}
            fetchPriority={
              activeImage === 0 ? "high" : "auto"
            }
            decoding="async"
            initial={{
              opacity: 0,
              scale: reduceMotion ? 1 : 1.025,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1,
            }}
            transition={{
              opacity: {
                duration: reduceMotion ? 0.2 : 0.9,
                ease: "easeInOut",
              },

              scale: {
                duration: 5,
                ease: "easeOut",
              },
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* overlays */}
        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col px-5 pb-8 pt-28 sm:px-6 sm:pb-10 lg:px-10 lg:pb-10 lg:pt-32">
        {/* TOP */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-[#daa52c]" />

          <p className="text-[9px] uppercase tracking-[0.34em] text-white/60 sm:text-[10px]">
            Coffee from Cianjur, West Java
          </p>
        </motion.div>

        {/* MAIN */}
        <div className="mt-auto max-w-[760px]">
          <motion.p
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.05,
            }}
            className="mb-4 text-[9px] uppercase tracking-[0.4em] text-[#e1aa30]"
          >
            Endemix Nusantara
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[13vw] font-medium leading-[0.92] tracking-[-0.055em] sm:text-[72px] md:text-[82px] lg:text-[92px] xl:text-[104px]"
          >
            A story grown
            <br />

            from{" "}

            <span className="italic text-[#dda52e]">
              the land.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="mt-6 max-w-[480px] text-[13px] leading-6 text-white/65 sm:text-sm sm:leading-7"
          >
            Dari tanah Cianjur, perjalanan kopi tumbuh melalui
            proses, waktu, dan orang-orang yang menjaganya hingga
            sampai ke setiap cangkir.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.35,
            }}
            className="mt-7"
          >
            <a
              href="#story"
              className="group inline-flex items-center gap-4 text-[13px]"
            >
              <span>Discover the story</span>

              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-white/5 backdrop-blur-sm transition duration-300 group-hover:bg-white group-hover:text-black">
                ↓
              </span>
            </a>
          </motion.div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 flex items-end justify-between">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage.label}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 4,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/45">
                  {String(activeImage + 1).padStart(2, "0")}
                  {" / "}
                  {String(heroImages.length).padStart(2, "0")}

                  <span className="ml-4 text-white/70">
                    {currentImage.label}
                  </span>
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-3 flex gap-2">
              {heroImages.map((item, index) => (
                <button
                  key={item.src}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Open ${item.label}`}
                  className={`h-[2px] transition-all duration-500 ${
                    activeImage === index
                      ? "w-9 bg-[#dda52e]"
                      : "w-4 bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="hidden text-[9px] uppercase tracking-[0.28em] text-white/35 sm:block">
            First Cianjur Coffee Production
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;