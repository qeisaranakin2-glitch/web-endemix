import { motion } from "framer-motion";

function Origin() {
  return (
    <section
      id="origin"
      className="bg-[#17130f] px-5 py-24 text-[#f1ece2] sm:px-6 md:py-32 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#c49a44]">
              03 / Origin
            </p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="mt-6 text-5xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-7xl"
            >
              From Cianjur,
              <br />
              shaped by place.
            </motion.h2>

            <p className="mt-8 max-w-md text-sm leading-7 text-white/50 sm:text-base">
              Karakter kopi terbentuk bukan hanya dari proses, tetapi juga dari
              tempatnya tumbuh. Iklim, tanah, dan lingkungan menjadi bagian
              dari identitas setiap biji.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="relative aspect-[16/10] overflow-hidden bg-[#30291f]"
          >
            {/* nanti ganti dengan foto origin */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#65734a_0%,#2d3325_40%,#181713_80%)]" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-9">
              <div className="flex items-end justify-between border-t border-white/25 pt-5">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">
                    Origin
                  </p>
                  <p className="mt-2 text-2xl">
                    Cianjur
                    <br />
                    West Java
                  </p>
                </div>

                <p className="max-w-[180px] text-right text-xs leading-5 text-white/40">
                  A place where every harvest carries its own character.
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