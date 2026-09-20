import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "../context/LanguageContext.jsx";
import translations from "../data/translations.js";

const whatsappNumber = "6287823404009";

const productData = [
  {
    key: "Arabica",
    name: "Arabica",
    image: "/images/products/produk-1.jpg",
  },
  {
    key: "Robusta",
    name: "Robusta",
    image: "/images/products/produk-2.jpg",
  },
];

function ProductLightbox({ product, info, onClose }) {
  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close product image"
        className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/30 text-xl text-white backdrop-blur-md transition hover:bg-white hover:text-black sm:right-6 sm:top-6"
      >
        ×
      </button>

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
        onClick={(event) => event.stopPropagation()}
        className="flex h-full w-full max-w-[1200px] flex-col"
      >
        <div className="relative min-h-0 flex-1">
          <img
            src={product.image}
            alt={product.name}
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>

        <div className="flex items-end justify-between gap-6 border-t border-white/15 py-5 text-white">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#d8a63c]">
              Pohon Kopi
            </p>

            <h3 className="mt-2 text-2xl font-medium">
              {product.name}
            </h3>

            <p className="mt-1 text-sm text-white/45">
              {info.origin} — {info.notes}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { language } = useLanguage();

  const t = translations[language].products;

  const getWhatsAppLink = (message) => {
    return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;
  };

  const selectedInfo = selectedProduct
    ? t.items[selectedProduct.key]
    : null;

  return (
    <>
      <section
        id="products"
        className="bg-[#f1ece2] px-5 py-24 sm:px-6 md:py-32 lg:px-10 lg:py-40"
      >
        <div className="mx-auto max-w-[1400px]">
          {/* HEADER */}
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8f6825]">
                04 / {t.section}
              </p>

              <h2 className="mt-6 text-5xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-7xl">
                {t.title1}
                <br />
                {t.title2}
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-black/50 sm:text-base">
              {t.description}
            </p>
          </div>

          {/* PRODUCTS */}
          <div className="mt-20 border-t border-black/15">
            {productData.map((product, index) => {
              const info = t.items[product.key];

              return (
                <motion.article
                  key={product.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  className="group grid gap-6 border-b border-black/15 py-7 sm:py-8 md:grid-cols-[50px_170px_1fr_1fr_auto] md:items-center lg:grid-cols-[60px_190px_1fr_1fr_auto]"
                >
                  {/* NUMBER */}
                  <p className="text-[10px] tracking-[0.3em] text-black/35">
                    0{index + 1}
                  </p>

                  {/* IMAGE */}
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    aria-label={`Open ${product.name}`}
                    className="relative h-[130px] w-full cursor-zoom-in overflow-hidden bg-[#ddd3c3] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#8f6825] sm:h-[150px] md:h-[120px] md:w-[170px] lg:h-[135px] lg:w-[190px]"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />

                    <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />

                    <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/20 text-xs text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100">
                      ↗
                    </span>
                  </button>

                  {/* NAME */}
                  <h3 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                    {product.name}
                  </h3>

                  {/* INFO */}
                  <div className="text-sm text-black/45">
                    <p>{info.origin}</p>
                    <p className="mt-1">{info.notes}</p>
                  </div>

                  {/* WHATSAPP */}
                  <div>
                    <a
                      href={getWhatsAppLink(info.whatsapp)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 text-sm font-medium transition hover:text-[#8f6825]"
                    >
                      {t.buy}

                      <span className="transition duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProduct && selectedInfo && (
          <ProductLightbox
            product={selectedProduct}
            info={selectedInfo}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Products;