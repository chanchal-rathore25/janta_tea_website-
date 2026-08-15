import { Link } from "@tanstack/react-router";

const pageLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "What we sell",
    href: "/#categories",
  },
  {
    label: "Popular teas",
    href: "/#products",
  },
  {
    label: "About us",
    href: "/about",
  },
];

const categoryLinks = [
  {
    label: "Tea Leaf",
    slug: "tea-leaf",
  },
  {
    label: "Tea Powder",
    slug: "tea-powder",
  },
  {
    label: "Green Tea",
    slug: "green-tea",
  },
  {
    label: "Cardamom Tea",
    slug: "cardamom-tea",
  },
  {
    label: "Cardamom Flavour",
    slug: "cardamom-flavour",
  },
  {
    label: "Coffee",
    slug: "coffee",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-cream-deep text-chai">

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:px-12">

        <div className="grid gap-12 border-b border-border pb-14 md:grid-cols-12">

          {/* =================================================
              BRAND
          ================================================== */}

          <div className="md:col-span-5">

            <Link
              to="/"
              className="inline-block transition-opacity duration-300 hover:opacity-80"
            >
              <h3 className="font-display text-3xl text-chai sm:text-4xl">
                Janta{" "}
                <span className="italic text-terracotta">
                  Tea Co.
                </span>
              </h3>
            </Link>

            <p className="mt-5 max-w-[42ch] text-sm leading-7 text-chai/60">
              Tea merchants and wholesale dealers in Siyaganj,
              Indore since 1974. Fresh tea leaf, tea powder,
              green tea, cardamom and coffee — for homes and
              businesses.
            </p>

            {/* Location */}

            <div className="mt-6 flex items-start gap-3 text-sm text-chai/55">
              <span className="mt-0.5 text-terracotta">
                ●
              </span>

              <span>
                Siyaganj Market,
                <br />
                Indore, Madhya Pradesh
              </span>
            </div>

            {/* WhatsApp */}

            <a
              href="https://api.whatsapp.com/send?phone=919926699991"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center rounded-full bg-chai px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-terracotta"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* =================================================
              PAGES
          ================================================== */}

          <div className="md:col-span-2">

            <h4 className="label-eyebrow text-cardamom">
              Pages
            </h4>

            <ul className="mt-5 space-y-3.5">

              {pageLinks.map((item) => (
                <li key={item.label}>

                  <a
                    href={item.href}
                    className="text-sm text-chai/65 transition-colors duration-200 hover:text-terracotta"
                  >
                    {item.label}
                  </a>

                </li>
              ))}

            </ul>
          </div>

          {/* =================================================
              OUR ITEMS
          ================================================== */}

          <div className="md:col-span-2">

            <h4 className="label-eyebrow text-cardamom">
              Our items
            </h4>

            <ul className="mt-5 space-y-3.5">

              {categoryLinks.map((item) => (
                <li key={item.slug}>

                  <Link
                    to="/category/$slug"
                    params={{ slug: item.slug }}
                    className="text-sm text-chai/65 transition-colors duration-200 hover:text-terracotta"
                  >
                    {item.label}
                  </Link>

                </li>
              ))}

            </ul>
          </div>

          {/* =================================================
              CONTACT
          ================================================== */}

          <div className="md:col-span-3">

            <h4 className="label-eyebrow text-cardamom">
              Contact
            </h4>

            <ul className="mt-5 space-y-3">

              {/* Phone */}

              <li>
                <a
                  href="tel:+919926699991"
                  className="group flex items-center gap-3 text-sm text-chai/70 transition-colors hover:text-terracotta"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-chai/10 bg-cream text-[10px]">
                    TEL
                  </span>

                  <span>
                    +91 99266 99991
                  </span>
                </a>
              </li>

              {/* Landline */}

              <li>
                <a
                  href="tel:07314040200"
                  className="group flex items-center gap-3 text-sm text-chai/70 transition-colors hover:text-terracotta"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-chai/10 bg-cream text-[10px]">
                    TEL
                  </span>

                  <span>
                    0731-4040200
                  </span>
                </a>
              </li>

              {/* Email */}

              <li>
                <a
                  href="mailto:jantatea@yahoo.com"
                  className="group flex items-center gap-3 text-sm text-chai/70 transition-colors hover:text-terracotta"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-chai/10 bg-cream text-[9px]">
                    @
                  </span>

                  <span className="break-all">
                    jantatea@yahoo.com
                  </span>
                </a>
              </li>

            </ul>

            {/* Call CTA */}

            <a
              href="tel:+919926699991"
              className="mt-7 inline-flex rounded-full border border-chai/15 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-chai transition-all duration-300 hover:border-chai hover:bg-chai hover:text-cream"
            >
              Call for wholesale rates
            </a>
          </div>
        </div>

        {/* =====================================================
            BOTTOM FOOTER
        ====================================================== */}

        <div className="flex flex-col gap-4 py-8 text-xs text-chai/45 md:flex-row md:items-center md:justify-between">

          <p>
            © {currentYear} Janta Tea Company.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              Tea merchants & wholesale dealers
            </span>

            <span className="text-chai/20">
              •
            </span>

            <span>
              Siyaganj, Indore
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}