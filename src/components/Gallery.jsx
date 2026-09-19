import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

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

function GalleryMedia({
  media,
  title,
  activeMedia,
  isVisible,
}) {
  const current = media[activeMedia];
  const videoRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (current.type !== "video") return;

    const video = videoRef.current;

    if (!video) return;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [current, isVisible]);

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
              duration: reduceMotion ? 0.2 : 0.8,
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
              duration: reduceMotion ? 0.2 : 0.8,
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

function GalleryItem({ item, index }) {
  const itemRef = useRef(null);
  const [activeMedia, setActiveMedia] = useState(0);

  const isVisible = useInView(itemRef, {
    amount: 0.15,
    margin: "150px 0px 150px 0px",
  });

  const reduceMotion = useReducedMotion();

  const currentMedia = item.media[activeMedia];

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
    activeMedia,
    currentMedia.type,
    item.media,
    item.videoDuration,
    item.imageDuration,
  ]);

  const changeMedia = (mediaIndex) => {
    setActiveMedia(mediaIndex);
  };

  return (
    <motion.figure
      ref={itemRef}
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
      className={`group relative overflow-hidden bg-[#2a231c] ${item.className}`}
    >
      {/* MEDIA */}
      <motion.div
        style={{ y: imageY }}
        className="absolute -inset-y-8 inset-x-0"
      >
        <GalleryMedia
          media={item.media}
          title={item.title}
          activeMedia={activeMedia}
          isVisible={isVisible}
        />
      </motion.div>

      {/* OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/20" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-80 transition duration-500 group-hover:opacity-100" />

      {/* NUMBER */}
      <div className="absolute left-5 top-5 sm:left-6 sm:top-6">
        <p className="text-[9px] tracking-[0.32em] text-white/55">
          {String(index + 1).padStart(2, "0")}
        </p>
      </div>

      {/* MEDIA INDICATOR */}
      {item.media.length > 1 && (
        <div className="absolute right-5 top-5 z-10 flex items-center gap-1.5 sm:right-6 sm:top-6">
          {item.media.map((mediaItem, mediaIndex) => (
            <button
              key={`${mediaItem.src}-${mediaIndex}`}
              onClick={() => changeMedia(mediaIndex)}
              aria-label={`Open ${item.title} media ${mediaIndex + 1}`}
              className={`h-[2px] transition-all duration-500 ${
                mediaIndex === activeMedia
                  ? "w-7 bg-[#d8a63c]"
                  : "w-3 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}

      {/* VIDEO BADGE */}
      {currentMedia.type === "video" && (
        <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />

            <span className="text-[8px] uppercase tracking-[0.25em] text-white/60">
              Motion
            </span>
          </div>
        </div>
      )}

      {/* CAPTION */}
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div>
          <p className="text-xl font-medium tracking-[-0.025em] sm:text-2xl">
            {item.title}
          </p>

          <p className="mt-2 max-w-[240px] text-xs leading-5 text-white/50 md:translate-y-2 md:opacity-0 md:transition md:duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            {item.subtitle}
          </p>
        </div>
      </figcaption>
    </motion.figure>
  );
}

function Gallery() {
  return (
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
              05 / Gallery
            </p>

            <h2 className="mt-5 text-4xl font-medium tracking-[-0.045em] sm:text-5xl md:text-6xl">
              Stories in frames.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/45">
            Potongan perjalanan Pohon Kopi melalui tempat, proses,
            orang-orang, dan detail di balik setiap biji kopi.
          </p>
        </motion.div>

        {/* GALLERY */}
        <div className="mt-10 grid auto-rows-[240px] grid-cols-1 gap-3 sm:auto-rows-[280px] md:grid-cols-12 md:auto-rows-[250px] lg:auto-rows-[290px]">
          {galleryItems.map((item, index) => (
            <GalleryItem
              key={item.title}
              item={item}
              index={index}
            />
          ))}
        </div>

        {/* BOTTOM */}
        <div className="mt-9 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
              Cianjur, West Java
            </p>

            <p className="mt-2 text-xs text-white/35">
              Every frame carries a part of the journey.
            </p>
          </div>

          <a
            href="https://www.instagram.com/pohon_kopi/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-3 text-sm"
          >
            More on Instagram

            <span className="transition duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Gallery;