import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Navbar() {
  const [open, setOpen] = useState(false);

  const menu = [
    { label: "Story", href: "#story" },
    { label: "Process", href: "#process" },
    { label: "Origin", href: "#origin" },
    { label: "Products", href: "#products" },
    { label: "Gallery", href: "#gallery" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-black/10 text-white backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 sm:px-6 lg:px-10">
        {/* BRAND */}
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-[11px] font-semibold tracking-[0.08em] text-[#e2ad39] backdrop-blur-md">
            PK
          </div>

          <div className="leading-none">
            <p className="text-[13px] font-semibold tracking-[0.18em]">
              POHON KOPI
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-[0.24em] text-white/45">
              Cianjur, West Java
            </p>
          </div>
        </a>

        {/* DESKTOP MENU */}
        <nav className="hidden items-center gap-8 text-[13px] lg:flex">
          {menu.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white/75 transition hover:text-[#e1aa30]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/pohon_kopi/"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 text-[13px] text-white/80 sm:flex"
          >
            <span>Instagram</span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition hover:bg-white hover:text-black">
              ↗
            </span>
          </a>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 lg:hidden"
            aria-label="Toggle menu"
          >
            <span className="text-xl">
              {open ? "×" : "≡"}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="border-t border-white/15 bg-[#17130f]/95 px-5 py-6 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-5">
              {menu.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-medium tracking-[-0.03em] text-white"
                >
                  {item.label}
                </a>
              ))}

              <div className="mt-2 border-t border-white/10 pt-5">
                <a
                  href="https://www.instagram.com/pohon_kopi/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/50"
                >
                  Instagram ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;