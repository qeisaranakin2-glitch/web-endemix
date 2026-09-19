import { motion } from "framer-motion";

const products = [
  {
    name: "Arabica",
    origin: "Cianjur",
    notes: "Clean, bright, expressive",
    image: "/images/products/produk-1.jpg",
  },
  {
    name: "Robusta",
    origin: "Cianjur",
    notes: "Bold, deep, full body",
    image: "/images/products/produk-2.jpg",
  },
];

function Products() {
  return (
    <section
      id="products"
      className="bg-[#f1ece2] px-5 py-24 sm:px-6 md:py-32 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* HEADER */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8f6825]">
              04 / Our Coffee
            </p>

            <h2 className="mt-6 text-5xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-7xl">
              Coffee with
              <br />
              its own character.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-black/50 sm:text-base">
            Setiap kopi punya karakter yang berbeda. Foto, origin, karakter,
            dan informasi singkat membantu pengunjung mengenal produknya.
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="mt-20 border-t border-black/15">
          {products.map((product, index) => (
            <motion.article
              key={product.name}
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
              <div className="relative h-[130px] w-full overflow-hidden bg-[#ddd3c3] sm:h-[150px] md:h-[120px] md:w-[170px] lg:h-[135px] lg:w-[190px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>

              {/* NAME */}
              <h3 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                {product.name}
              </h3>

              {/* INFO */}
              <div className="text-sm text-black/45">
                <p>{product.origin}</p>
                <p className="mt-1">{product.notes}</p>
              </div>

              {/* LINK */}
              <div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 text-sm font-medium"
                >
                  Discover
                  <span className="transition duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;