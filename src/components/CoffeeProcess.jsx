import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import { useLanguage } from "../context/LanguageContext.jsx";
import translations from "../data/translations.js";

const processMedia = [
  {
    type: "video",
    src: "/images/process/growing-1.mp4",
  },
  {
    type: "video",
    src: "/images/process/harvesting.mp4",
  },
  {
    type: "video",
    src: "/images/process/pulping.mp4",
  },
   {
    type: "image",
    src: "/images/process/drying.jpg",
  },
  {
    type: "video",
    src: "/images/process/green-bean.mp4",
  },
  {
    type: "video",
    src: "/images/process/roasting.mp4",
  },
];

const backgrounds = [
  "bg-[radial-gradient(circle_at_55%_30%,#65734a_0%,#293222_38%,#151a13_80%)]",
  "bg-[radial-gradient(circle_at_50%_35%,#8d4934_0%,#43281f_42%,#1b1511_82%)]",
  "bg-[radial-gradient(circle_at_45%_35%,#a15c39_0%,#513322_42%,#1d1611_82%)]",
  "bg-[radial-gradient(circle_at_50%_45%,#b58b53_0%,#59452c_40%,#201a14_82%)]",
  "bg-[radial-gradient(circle_at_55%_35%,#84906e_0%,#3e4936_42%,#171c14_82%)]",
  "bg-[radial-gradient(circle_at_45%_40%,#8c6b3e_0%,#3b2e20_42%,#17130f_82%)]",
];

function ProcessMedia({
  media,
  title,
  onOpen,
}) {
  if (!media) return null;

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      aria-label={`Open ${title}`}
      className="group relative h-full w-full cursor-zoom-in overflow-hidden outline-none"
    >
      {media.type === "video" ? (
        <video
          src={media.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={media.src}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      )}

      {/* HOVER */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />

      {/* OPEN ICON */}
      <div className="pointer-events-none absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/20 text-sm text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100">
        ↗
      </div>
    </div>
  );
}

function ProcessLightbox({
  media,
  title,
  closeLightbox,
  processLabel,
}) {
  useEffect(() => {
    const oldOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        oldOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [closeLightbox]);

  if (!media) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={closeLightbox}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 sm:p-6 lg:p-10"
    >
      {/* CLOSE */}
      <button
        type="button"
        onClick={closeLightbox}
        aria-label="Close media"
        className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-xl text-white backdrop-blur-md transition hover:bg-white hover:text-black sm:right-6 sm:top-6"
      >
        ×
      </button>

      {/* LIGHTBOX CONTENT */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.98,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        onClick={(event) =>
          event.stopPropagation()
        }
        className="relative flex h-full w-full max-w-[1500px] flex-col"
      >
        {/* MEDIA */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          {media.type === "video" ? (
            <video
              src={media.src}
              controls
              autoPlay
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : (
            <img
              src={media.src}
              alt={title}
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain"
            />
          )}
        </div>

        {/* INFO */}
        <div className="border-t border-white/15 py-5 text-white">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#d8a63c]">
            {processLabel}
          </p>

          <p className="mt-2 text-xl font-medium">
            {title}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SkipButton({
  label,
  onSkip,
}) {
  return (
    <motion.button
      type="button"
      onClick={onSkip}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.97 }}
      className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-black/65 transition-colors hover:text-black"
    >
      <span>{label}</span>

      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/25 transition-all duration-300 group-hover:border-black/60">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-3.5 w-3.5"
        >
          <path
            d="M5 12H19M14 7L19 12L14 17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </motion.button>
  );
}

function DesktopProcess({
  processData,
  t,
  onSkip,
  onOpenMedia,
}) {
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {
      const nextIndex = Math.min(
        Math.floor(
          latest * processData.length
        ),
        processData.length - 1
      );

      setActiveIndex((prev) =>
        prev === nextIndex
          ? prev
          : nextIndex
      );
    }
  );

  const current =
    processData[activeIndex];

  return (
    <div
      ref={sectionRef}
      className="relative hidden lg:block"
      style={{
        height: `${
          processData.length * 100
        }vh`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid h-full grid-cols-2">
          {/* LEFT */}
          <div className="relative overflow-hidden bg-[#eee6d8] px-10 xl:px-16">
            <div className="absolute left-10 top-10 xl:left-16">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8f6825]">
                02 / {t.section}
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
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  >
                    <p className="text-[11px] tracking-[0.3em] text-black/35">
                      {current.number}
                    </p>

                    <h2 className="mt-5 max-w-[650px] text-[68px] font-medium leading-[0.88] tracking-[-0.065em] xl:text-[92px]">
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

            {/* BOTTOM */}
            <div className="absolute bottom-8 left-10 right-10 xl:left-16 xl:right-16">
              <div className="flex items-center gap-5">
                <div className="relative h-px flex-1 overflow-hidden bg-black/15">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-black"
                    animate={{
                      width: `${
                        ((activeIndex + 1) /
                          processData.length) *
                        100
                      }%`,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  />
                </div>

                <p className="whitespace-nowrap text-[9px] uppercase tracking-[0.3em] text-black/35">
                  {t.scroll}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <p className="text-[9px] uppercase tracking-[0.25em] text-black/25">
                  {current.number} /{" "}
                  {String(
                    processData.length
                  ).padStart(2, "0")}
                </p>

                <SkipButton
                  label={t.skip}
                  onSkip={onSkip}
                />
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
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="absolute inset-0"
              >
                {current.media ? (
                  <ProcessMedia
                    media={
                      current.media
                    }
                    title={
                      current.title
                    }
                    onOpen={() =>
                      onOpenMedia(
                        current.media,
                        current.title
                      )
                    }
                  />
                ) : (
                  <div
                    className={`h-full w-full ${
                      backgrounds[
                        activeIndex %
                          backgrounds.length
                      ]
                    }`}
                  />
                )}

                {/* jangan blok klik media */}
                <div className="pointer-events-none absolute inset-0 bg-black/10" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-10 pt-28 text-white">
                  <div className="flex items-end justify-between border-t border-white/25 pt-5">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.32em] text-white/45">
                        {
                          t.processLabel
                        }
                      </p>

                      <p className="mt-2 text-2xl font-medium">
                        {
                          current.number
                        }{" "}
                        /{" "}
                        {String(
                          processData.length
                        ).padStart(
                          2,
                          "0"
                        )}
                      </p>
                    </div>

                    <p className="text-xs text-white/40">
                      {t.location}
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

function MobileProcess({
  processData,
  t,
  onSkip,
  onOpenMedia,
}) {
  return (
    <div className="lg:hidden">
      <div className="px-5 pb-12 pt-20 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8f6825]">
            02 / {t.section}
          </p>

          <SkipButton
            label={t.skipShort}
            onSkip={onSkip}
          />
        </div>

        <h2 className="mt-7 text-5xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl">
          {t.mobileHeading1}

          <br />

          {t.mobileHeading2}
        </h2>

        <p className="mt-5 max-w-sm text-sm leading-6 text-black/45">
          {t.mobileIntro}
        </p>
      </div>

      {processData.map(
        (item, index) => (
          <motion.article
            key={item.number}
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
              amount: 0.15,
            }}
            transition={{
              duration: 0.6,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="border-t border-black/10 px-5 py-10 sm:px-6"
          >
            <div
              className={`relative aspect-[4/5] overflow-hidden ${
                backgrounds[
                  index %
                    backgrounds.length
                ]
              }`}
            >
              {item.media && (
                <ProcessMedia
                  media={item.media}
                  title={item.title}
                  onOpen={() =>
                    onOpenMedia(
                      item.media,
                      item.title
                    )
                  }
                />
              )}

              {/* jangan blok klik */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] tracking-[0.3em] text-white/60">
                    {item.number} /{" "}
                    {String(
                      processData.length
                    ).padStart(
                      2,
                      "0"
                    )}
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/45">
                    {
                      t.processLabel
                    }
                  </p>
                </div>
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
        )
      )}
    </div>
  );
}

function CoffeeProcess() {
  const { language } =
    useLanguage();

  const t =
    translations[language].process;

  const [lightbox, setLightbox] =
    useState(null);

  const processData =
    t.stages.map(
      (stage, index) => ({
        ...stage,
        media:
          processMedia[index],
      })
    );

  const openMedia = (
    media,
    title
  ) => {
    setLightbox({
      media,
      title,
    });
  };

  const closeMedia = () => {
    setLightbox(null);
  };

  const handleSkip = () => {
    const processSection =
      document.getElementById(
        "process"
      );

    if (!processSection) return;

    const nextSection =
      processSection.nextElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    window.scrollTo({
      top:
        processSection.offsetTop +
        processSection.offsetHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section
        id="process"
        className="bg-[#eee6d8]"
      >
        <DesktopProcess
          processData={
            processData
          }
          t={t}
          onSkip={handleSkip}
          onOpenMedia={
            openMedia
          }
        />

        <MobileProcess
          processData={
            processData
          }
          t={t}
          onSkip={handleSkip}
          onOpenMedia={
            openMedia
          }
        />
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <ProcessLightbox
            media={
              lightbox.media
            }
            title={
              lightbox.title
            }
            processLabel={
              t.processLabel
            }
            closeLightbox={
              closeMedia
            }
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default CoffeeProcess;