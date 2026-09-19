function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#17130f] px-5 py-14 text-white sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-2">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#c49a44]">
              Endemix Nusantara
            </p>

            <h2 className="mt-6 max-w-2xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-7xl">
              Let the coffee
              <br />
              tell the story.
            </h2>
          </div>

          <div className="flex flex-col justify-end gap-6 lg:items-end">
            <a
              href="https://www.instagram.com/pohon_kopi/"
              target="_blank"
              rel="noreferrer"
              className="text-lg underline decoration-white/25 underline-offset-8"
            >
              @pohon_kopi ↗
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=6287823404009"
              target="_blank"
              rel="noreferrer"
              className="text-lg underline decoration-white/25 underline-offset-8"
            >
              WhatsApp ↗
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>Endemix Nusantara — Cianjur, West Java</p>
          <p>Crafted from origin to every bean.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;