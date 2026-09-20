import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { useLanguage } from "../context/LanguageContext.jsx";
import translations from "../data/translations.js";

const galleryItems = [
  {
    title: "The Origin",
    subtitle: "Where the story begins.",
    media: [
      {
        type: "image",
        src: "/images/gallery/origin-1.jpg",
      },
      {
        type: "image",
        src: "/images/gallery/origin-2.JPG",
      },
      {
        type: "image",
        src: "/images/gallery/origin-3.jpg",
      },
    ],
    className: "md:col-span-7 md:row-span-2",
    parallax: 28,
    imageDuration: 4500,
  },

  {
    title: "Coffee Cherry",
    subtitle: "Color before the process.",
    media: [
      {
        type: "video",
        src: "/videos/cherry-1.mp4",
      },
      {
        type: "image",
        src: "/images/gallery/cherry-1.jpg",
      },
      {
        type: "image",
        src: "/images/gallery/cherry-2.jpg",
      },
    ],
    className: "md:col-span-5",
    parallax: 18,
    videoDuration: 10000,
    imageDuration: 4800,
  },

  {
    title: "The Process",
    subtitle: "Handled with attention.",
    media: [
      {
        type: "video",
        src: "/videos/process-1.mp4",
      },
      {
        type: "video",
        src: "/videos/process-2.mp4",
      },
      {
        type: "image",
        src: "/images/gallery/process-1.jpg",
      },
    ],
    className: "md:col-span-5",
    parallax: 24,
    videoDuration: 10000,
    imageDuration: 5000,
  },

  {
    title: "Drying",
    subtitle: "Time shapes character.",
    media: [
      {
        type: "image",
        src: "/images/gallery/drying-1.jpg",
      },
      {
        type: "image",
        src: "/images/gallery/drying-2.jpg",
      },
    ],
    className: "md:col-span-4",
    parallax: 16,
    imageDuration: 5200,
  },

  {
    title: "The Team",
    subtitle: "People behind every step.",
    media: [
      {
        type: "image",
        src: "/images/gallery/team-1.jpg",
      },
      {
        type: "image",
        src: "/images/gallery/team-2.jpeg",
      },
      {
        type: "video",
        src: "/videos/team-1.mp4",
      },
    ],
    className: "md:col-span-8",
    parallax: 25,
    videoDuration: 10000,
    imageDuration: 4600,
  },

  {
    title: "The Beans",
    subtitle: "Ready for the next journey.",
    media: [
      {
        type: "video",
        src: "/videos/beans-1.mp4",
      },
      {
        type: "image",
        src: "/images/gallery/beans-1.jpg",
      },
      {
        type: "image",
        src: "/images/gallery/beans-2.jpg",
      },
    ],
    className: "md:col-span-6",
    parallax: 20,
    videoDuration: 10000,
    imageDuration: 4800,
  },

  {
    title: "Behind Pohon Kopi",
    subtitle: "More than coffee.",
    media: [
      {
        type: "image",
        src: "/images/gallery/behind-1.jpg",
      },
      {
        type: "image",
        src: "/images/gallery/behind-2.jpg",
      },
      {
        type: "image",
        src: "/images/gallery/behind-3.jpg",
      },
    ],
    className: "md:col-span-6",
    parallax: 22,
    imageDuration: 5000,
  },
];

const galleryTranslationKeys = {
  "The Origin": "origin",
  "Coffee Cherry": "cherry",
  "The Process": "process",
  Drying: "drying",
  "The Team": "team",
  "The Beans": "beans",
  "Behind Pohon Kopi": "behind",
};

function getGalleryCopy(item, t) {
  const key = galleryTranslationKeys[item.title];

  if (!key || !t.items[key]) {
    return {
      title: item.title,
      subtitle: item.subtitle,
    };
  }

  return t.items[key];
}

function GalleryMedia({
  media,
  title,
  activeMedia,
  isVisible,
  paused,
}) {
  const current = media[activeMedia];
  const videoRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (current.type !== "video") return;

    const video = videoRef.current;

    if (!video) return;

    if (isVisible && !paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [current, isVisible, paused]);

  return (
    <AnimatePresence mode="sync">
      {current.type === "video" ? (
        <motion.video
          ref={videoRef}
          key={current.src}
          src={current.src}
          muted
          playsInline
          preload="metadata"
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
              duration: reduceMotion ? 0.2 : 0.75,
              ease: "easeInOut",
            },
            scale: {
              duration: 8,
              ease: "linear",
            },
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <motion.img
          key={current.src}
          src={current.src}
          alt={`${title} ${activeMedia + 1}`}
          loading="lazy"
          decoding="async"
          initial={{
            opacity: 0,
            scale: reduceMotion ? 1 : 1.035,
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
              duration: reduceMotion ? 0.2 : 0.75,
              ease: "easeInOut",
            },
            scale: {
              duration: 6,
              ease: "easeOut",
            },
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </AnimatePresence>
  );
}

function GalleryItem({
  item,
  index,
  openLightbox,
  lightboxOpen,
  t,
}) {
  const itemRef = useRef(null);

  const [activeMedia, setActiveMedia] = useState(0);

  const currentMedia = item.media[activeMedia];

  const copy = getGalleryCopy(item, t);

  const isVisible = useInView(itemRef, {
    amount: 0.15,
    margin: "150px 0px 150px 0px",
  });

  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  const parallaxAmount = reduceMotion ? 0 : item.parallax;

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [-parallaxAmount, parallaxAmount]
  );

  useEffect(() => {
    if (!isVisible) return;
    if (lightboxOpen) return;
    if (!item.media || item.media.length <= 1) return;

    const duration =
      currentMedia.type === "video"
        ? item.videoDuration || 10000
        : item.imageDuration || 5000;

    const timer = setTimeout(() => {
      setActiveMedia((prev) => {
        return (prev + 1) % item.media.length;
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [
    isVisible,
    lightboxOpen,
    activeMedia,
    currentMedia.type,
    item.media,
    item.videoDuration,
    item.imageDuration,
  ]);

  const changeMedia = (mediaIndex) => {
    setActiveMedia(mediaIndex);
  };

  const handleOpen = () => {
    openLightbox(index, activeMedia);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpen();
    }
  };

  return (
    <motion.figure
      ref={itemRef}
      role="button"
      tabIndex={0}
      aria-label={`Open ${copy.title}`}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.08,
      }}
      transition={{
        duration: reduceMotion ? 0.25 : 0.65,
        delay: reduceMotion ? 0 : index * 0.025,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative cursor-pointer overflow-hidden bg-[#2a231c] outline-none focus-visible:ring-2 focus-visible:ring-[#d8a63c] ${item.className}`}
    >
      {/* MEDIA */}
      <motion.div
        style={{ y: imageY }}
        className="absolute -inset-y-8 inset-x-0"
      >
        <GalleryMedia
          media={item.media}
          title={copy.title}
          activeMedia={activeMedia}
          isVisible={isVisible}
          paused={lightboxOpen}
        />
      </motion.div>

      {/* OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/20" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-80 transition duration-500 group-hover:opacity-100" />

      {/* NUMBER */}
      <div className="pointer-events-none absolute left-5 top-5 sm:left-6 sm:top-6">
        <p className="text-[9px] tracking-[0.32em] text-white/55">
          {String(index + 1).padStart(2, "0")}
        </p>
      </div>

      {/* MEDIA INDICATOR */}
      {item.media.length > 1 && (
        <div
          className="absolute right-5 top-5 z-10 flex items-center gap-1.5 sm:right-6 sm:top-6"
          onClick={(event) => event.stopPropagation()}
        >
          {item.media.map((mediaItem, mediaIndex) => (
            <button
              key={`${mediaItem.src}-${mediaIndex}`}
              type="button"
              onClick={() => changeMedia(mediaIndex)}
              aria-label={`Open ${copy.title} media ${mediaIndex + 1}`}
              className={`h-[3px] transition-all duration-500 ${
                mediaIndex === activeMedia
                  ? "w-7 bg-[#d8a63c]"
                  : "w-3 bg-white/35 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}

      {/* VIDEO BADGE */}
      {currentMedia.type === "video" && (
        <div className="pointer-events-none absolute bottom-5 right-5 sm:bottom-6 sm:right-6">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />

            <span className="text-[8px] uppercase tracking-[0.25em] text-white/60">
              {t.motion}
            </span>
          </div>
        </div>
      )}

      {/* CAPTION */}
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div>
          <p className="text-xl font-medium tracking-[-0.025em] sm:text-2xl">
            {copy.title}
          </p>

          <p className="mt-2 max-w-[240px] text-xs leading-5 text-white/50 md:translate-y-2 md:opacity-0 md:transition md:duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            {copy.subtitle}
          </p>
        </div>
      </figcaption>

      {/* OPEN ICON */}
      <div className="pointer-events-none absolute right-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/15 text-sm text-white/70 opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100 sm:right-6">
        ↗
      </div>
    </motion.figure>
  );
}

function Lightbox({
  itemIndex,
  mediaIndex,
  setMediaIndex,
  closeLightbox,
  t,
}) {
  const item = galleryItems[itemIndex];
  const current = item.media[mediaIndex];

  const copy = getGalleryCopy(item, t);

  const nextMedia = () => {
    setMediaIndex((prev) => {
      return (prev + 1) % item.media.length;
    });
  };

  const prevMedia = () => {
    setMediaIndex((prev) => {
      return prev === 0
        ? item.media.length - 1
        : prev - 1;
    });
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyboard = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        nextMedia();
      }

      if (event.key === "ArrowLeft") {
        prevMedia();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, [closeLightbox]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-6 lg:p-10"
      onClick={closeLightbox}
    >
      {/* CLOSE */}
      <button
        type="button"
        onClick={closeLightbox}
        className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-xl text-white backdrop-blur-md transition hover:bg-white hover:text-black sm:right-6 sm:top-6"
        aria-label="Close gallery"
      >
        ×
      </button>

      {/* CONTENT */}
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
        className="relative flex h-full w-full max-w-[1500px] flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        {/* MEDIA AREA */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {current.type === "video" ? (
              <motion.video
                key={current.src}
                src={current.src}
                controls
                muted
                playsInline
                preload="metadata"
                initial={{
                  opacity: 0,
                  scale: 0.985,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.985,
                }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 h-full w-full object-contain"
              />
            ) : (
              <motion.img
                key={current.src}
                src={current.src}
                alt={`${copy.title} ${mediaIndex + 1}`}
                decoding="async"
                initial={{
                  opacity: 0,
                  scale: 0.985,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.985,
                }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 h-full w-full object-contain"
              />
            )}
          </AnimatePresence>

          {/* PREVIOUS */}
          {item.media.length > 1 && (
            <button
              type="button"
              onClick={prevMedia}
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-lg text-white backdrop-blur-md transition hover:bg-white hover:text-black sm:left-5"
              aria-label="Previous media"
            >
              ←
            </button>
          )}

          {/* NEXT */}
          {item.media.length > 1 && (
            <button
              type="button"
              onClick={nextMedia}
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-lg text-white backdrop-blur-md transition hover:bg-white hover:text-black sm:right-5"
              aria-label="Next media"
            >
              →
            </button>
          )}
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-4 border-t border-white/15 py-5 text-white sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#d8a63c]">
              {copy.title}
            </p>

            <p className="mt-2 text-sm text-white/50">
              {copy.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-[10px] tracking-[0.3em] text-white/40">
              {String(mediaIndex + 1).padStart(2, "0")}
              {" / "}
              {String(item.media.length).padStart(2, "0")}
            </p>

            <div className="flex gap-1.5">
              {item.media.map((mediaItem, index) => (
                <button
                  key={`${mediaItem.src}-${index}`}
                  type="button"
                  onClick={() => setMediaIndex(index)}
                  aria-label={`Open media ${index + 1}`}
                  className={`h-[3px] transition-all duration-300 ${
                    mediaIndex === index
                      ? "w-8 bg-[#d8a63c]"
                      : "w-4 bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Gallery() {
  const { language } = useLanguage();

  const t = translations[language].gallery;

  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (itemIndex, mediaIndex) => {
    setLightbox({
      itemIndex,
      mediaIndex,
    });
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  const setLightboxMedia = (value) => {
    setLightbox((prev) => {
      if (!prev) return prev;

      const item = galleryItems[prev.itemIndex];

      const next =
        typeof value === "function"
          ? value(prev.mediaIndex)
          : value;

      const safeIndex =
        ((next % item.media.length) +
          item.media.length) %
        item.media.length;

      return {
        ...prev,
        mediaIndex: safeIndex,
      };
    });
  };

  return (
    <>
      <section
        id="gallery"
        className="overflow-hidden bg-[#17130f] px-5 py-24 text-white sm:px-6 md:py-32 lg:px-10 lg:py-36"
      >
        <div className="mx-auto max-w-[1400px]">
          {/* HEADER */}
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
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-10 border-b border-white/15 pb-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#c89b3d]">
                05 / {t.section}
              </p>

              <h2 className="mt-5 text-4xl font-medium tracking-[-0.045em] sm:text-5xl md:text-6xl">
                {t.heading}
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-white/45">
              {t.description}
            </p>
          </motion.div>

          {/* GRID */}
          <div className="mt-10 grid auto-rows-[240px] grid-cols-1 gap-3 sm:auto-rows-[280px] md:grid-cols-12 md:auto-rows-[250px] lg:auto-rows-[290px]">
            {galleryItems.map((item, index) => (
              <GalleryItem
                key={item.title}
                item={item}
                index={index}
                openLightbox={openLightbox}
                lightboxOpen={Boolean(lightbox)}
                t={t}
              />
            ))}
          </div>

          {/* BOTTOM */}
          <div className="mt-9 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                {t.location}
              </p>

              <p className="mt-2 text-xs text-white/35">
                {t.bottomText}
              </p>
            </div>

            <a
              href="https://www.instagram.com/pohon_kopi/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-fit items-center gap-3 text-sm"
            >
              {t.instagram}

              <span className="transition duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            itemIndex={lightbox.itemIndex}
            mediaIndex={lightbox.mediaIndex}
            setMediaIndex={setLightboxMedia}
            closeLightbox={closeLightbox}
            t={t}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Gallery;