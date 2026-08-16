import {
  createFileRoute,
  Link,
  notFound,
} from "@tanstack/react-router";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";

import {
  CATEGORY_DATA,
  type CategoryData,
} from "@/data/category";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = CATEGORY_DATA[params.slug];

    if (!category) {
      throw notFound();
    }

    return category;
  },

  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const title = `${loaderData.name} — Janta Tea Company, Indore`;

    const description = `Buy fresh ${loaderData.name} from Janta Tea Company, Siyaganj, Indore. Retail packs and wholesale rates. Call +91 99266 99991.`;

    return {
      meta: [
        {
          title,
        },
        {
          name: "description",
          content: description,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:type",
          content: "website",
        },
      ],
    };
  },

  component: CategoryPage,
});

function CategoryPage() {
  const category =
    Route.useLoaderData() as CategoryData;

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-chai">
      <Navbar />

      <main>

        {/* ================= BREADCRUMB ================= */}

        <div className="mx-auto max-w-7xl px-5 pt-6 md:px-8 md:pt-8">
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-chai/45">

            <Link
              to="/"
              className="transition-colors hover:text-terracotta"
            >
              Home
            </Link>

            <span className="text-chai/20">/</span>

            <a
              href="/#categories"
              className="transition-colors hover:text-terracotta"
            >
              Categories
            </a>

            <span className="text-chai/20">/</span>

            <span className="text-chai/70">
              {category.name}
            </span>

          </div>
        </div>

        {/* ================= HERO ================= */}

        <section className="px-5 pb-16 pt-8 md:px-8 md:pb-24 md:pt-10">

          <div className="mx-auto max-w-7xl">

            <div className="grid overflow-hidden rounded-[2rem] border border-chai/[0.08] bg-[#eee2d0] shadow-[0_25px_80px_rgba(61,42,28,0.10)] lg:grid-cols-[1.08fr_0.92fr]">

              {/* IMAGE */}

              <div className="relative min-h-[460px] overflow-hidden bg-[#e7dac5] sm:min-h-[560px] lg:min-h-[650px]">

                <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border border-chai/[0.06]" />

                <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full border border-chai/[0.06]" />

                <div className="absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/50 blur-3xl" />

                <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12 lg:p-16">

                  <img
                    src={category.image}
                    alt={category.name}
                    width={1200}
                    height={1200}
                    className="relative z-10 max-h-full w-full object-contain drop-shadow-[0_25px_25px_rgba(55,38,25,0.20)] transition-transform duration-700 hover:scale-[1.04]"
                  />

                </div>

                <div className="absolute left-6 top-6 z-20 rounded-full border border-white/40 bg-white/80 px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-chai shadow-sm backdrop-blur-md">
                  Janta Tea Company
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between gap-4">

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-chai/45">
                      Premium Selection
                    </p>

                    <p className="mt-1 font-display text-xl text-chai sm:text-2xl">
                      {category.name}
                    </p>
                  </div>

                  <div className="hidden rounded-full bg-chai px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-cream sm:block">
                    Fresh Stock
                  </div>

                </div>
              </div>

              {/* CONTENT */}

              <div className="flex flex-col justify-center px-7 py-12 sm:px-10 md:px-14 md:py-16 lg:px-16">

                <span className="label-eyebrow text-cardamom">
                  {category.tag}
                </span>

                <h1 className="mt-4 max-w-xl font-display text-4xl leading-[1.05] text-balance sm:text-5xl lg:text-[4rem]">
                  {category.name}
                </h1>

                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px w-12 bg-terracotta" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-chai/40">
                    From Janta Tea Company
                  </span>
                </div>

                <p className="mt-7 max-w-[48ch] text-base leading-8 text-chai/65 md:text-lg">
                  {category.description}
                </p>

                {/* FEATURES */}

                <div className="mt-9 grid grid-cols-3 border-y border-chai/10 py-5">

                  <div className="border-r border-chai/10 pr-3">
                    <p className="font-display text-lg">
                      Fresh
                    </p>

                    <p className="mt-1 text-[9px] uppercase tracking-wider text-chai/45">
                      Quality
                    </p>
                  </div>

                  <div className="border-r border-chai/10 px-3">
                    <p className="font-display text-lg">
                      Rich
                    </p>

                    <p className="mt-1 text-[9px] uppercase tracking-wider text-chai/45">
                      Flavour
                    </p>
                  </div>

                  <div className="pl-3">
                    <p className="font-display text-lg">
                      Bulk
                    </p>

                    <p className="mt-1 text-[9px] uppercase tracking-wider text-chai/45">
                      Orders
                    </p>
                  </div>

                </div>

                {/* CTA */}

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                  <a
                    href="https://api.whatsapp.com/send?phone=919926699991"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-chai px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-terracotta"
                  >
                    Order on WhatsApp
                  </a>

                  <a
                    href="tel:+919926699991"
                    className="inline-flex items-center justify-center rounded-full border border-chai/15 bg-white/40 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-chai transition-all duration-300 hover:border-chai hover:bg-white"
                  >
                    Call Wholesale
                  </a>

                </div>

                <p className="mt-5 text-[11px] leading-5 text-chai/40">
                  Retail & wholesale orders available
                  <span className="mx-2">•</span>
                  Siyaganj, Indore
                </p>

              </div>
            </div>
          </div>
        </section>

        {/* ================= PRODUCTS ================= */}

        <section className="relative overflow-hidden bg-cream-deep px-5 py-20 md:px-8 md:py-24">

          <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full border border-chai/[0.05]" />

          <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full border border-chai/[0.05]" />

          <div className="relative mx-auto max-w-7xl">

            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

              <div>
                <span className="label-eyebrow text-cardamom">
                  Explore the collection
                </span>

                <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                  Discover our {category.name}
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-7 text-chai/55 md:text-right">
                Carefully selected products for everyday tea lovers,
                retailers and bulk buyers.
              </p>

            </div>

            <div className="mt-8 h-px w-full bg-chai/10" />

            {category.products.length > 0 ? (

              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                {category.products.map((item) => (
                  <div
                    key={item.name}
                    className="group transition-all duration-300 hover:-translate-y-1"
                  >
                    <ProductCard {...item} />
                  </div>
                ))}

              </div>

            ) : (

              <div className="mt-12 overflow-hidden rounded-[2rem] border border-chai/10 bg-cream shadow-sm">

                <div className="mx-auto max-w-xl px-6 py-16 text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-chai/10 bg-white font-display text-xl">
                    JT
                  </div>

                  <span className="mt-6 block text-[9px] font-semibold uppercase tracking-[0.2em] text-cardamom">
                    Janta Tea Company
                  </span>

                  <h3 className="mt-3 font-display text-3xl">
                    Our collection is being updated
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-chai/55">
                    Current stock and wholesale rates are available directly
                    from our team.
                  </p>

                  <a
                    href="tel:+919926699991"
                    className="mt-7 inline-flex rounded-full bg-chai px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream transition-all hover:bg-terracotta"
                  >
                    Call for Current Stock
                  </a>

                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================= CTA ================= */}

        <section className="px-5 py-16 md:px-8 md:py-24">

          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-chai shadow-[0_25px_70px_rgba(55,38,25,0.16)]">

            <div className="relative px-7 py-14 text-center sm:px-12 md:py-16">

              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-cream/10" />

              <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full border border-cream/10" />

              <div className="relative">

                <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-cream/45">
                  Wholesale & Retail
                </span>

                <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight text-cream sm:text-4xl">
                  Need a better price for your order?
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-cream/60">
                  Talk to Janta Tea Company for current stock,
                  wholesale pricing and bulk order requirements.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                  <a
                    href="https://api.whatsapp.com/send?phone=919926699991"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-cream px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-chai transition-all hover:bg-terracotta hover:text-cream"
                  >
                    WhatsApp Us
                  </a>

                  <a
                    href="tel:+919926699991"
                    className="rounded-full border border-cream/20 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream transition-all hover:border-cream/50 hover:bg-cream/10"
                  >
                    +91 99266 99991
                  </a>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BACK ================= */}

        <div className="px-5 pb-14 text-center">

          <a
            href="/#categories"
            className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-chai/45 transition-colors hover:text-terracotta"
          >
            <span className="text-base">←</span>
            Back to all categories
          </a>

        </div>

      </main>

      <Footer />
    </div>
  );
}