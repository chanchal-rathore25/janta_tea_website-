import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";

type CategoryProduct = {
  name: string;
  notes: string;
  price: string;
  mrp?: string;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
};

type CategoryData = {
  name: string;
  tag: string;
  image: string;
  description: string;
  products: CategoryProduct[];
};

const CATEGORY_DATA: Record<string, CategoryData> = {};

export const Route = createFileRoute()({
  loader: ({ params }: { params: { categorySlug: string } }) => {
    const category = CATEGORY_DATA[params.categorySlug];

    if (!category) throw notFound();

    return category;
  },

  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const title = `${loaderData.name} — Janta Tea Company, Indore`;
    const description = `Buy fresh ${loaderData.name} from Janta Tea Company, Siyaganj, Indore. Retail packs and wholesale rates. Call +91 99266 99991.`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
      ],
    };
  },

  component: CategoryPage,
});

function CategoryPage() {
  const category = Route.useLoaderData() as CategoryData;

  return (
    <div className="min-h-screen bg-cream text-chai">
      <Navbar />

      <main>
        {/* =========================
            BREADCRUMB
        ========================== */}
        <div className="mx-auto max-w-7xl px-5 pt-6 md:px-8 md:pt-8">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-chai/45">
            <Link
              to="/"
              className="transition-colors hover:text-terracotta"
            >
              Home
            </Link>

            <span className="text-chai/25">/</span>

            <a
              href="/#categories"
              className="transition-colors hover:text-terracotta"
            >
              Categories
            </a>

            <span className="text-chai/25">/</span>

            <span className="text-chai/70">{category.name}</span>
          </div>
        </div>

        {/* =========================
            HERO
        ========================== */}
        <section className="px-5 pb-16 pt-8 md:px-8 md:pb-24 md:pt-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid overflow-hidden rounded-[2rem] border border-chai/10 bg-[#efe4d2] shadow-[0_25px_70px_rgba(66,45,29,0.10)] lg:grid-cols-[1.05fr_0.95fr]">

              {/* IMAGE */}
              <div className="relative min-h-[420px] overflow-hidden md:min-h-[560px] lg:min-h-[620px]">
                <img
                  src={category.image}
                  alt={category.name}
                  width={1200}
                  height={1200}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-chai/45 via-transparent to-transparent" />

                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 rounded-full border border-white/30 bg-white/90 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-chai shadow-lg backdrop-blur-md">
                  Freshly Selected
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col justify-center px-7 py-12 md:px-12 md:py-16 lg:px-16">
                <span className="label-eyebrow text-cardamom">
                  {category.tag}
                </span>

                <h1 className="mt-4 max-w-xl font-display text-4xl leading-[1.05] text-balance md:text-5xl lg:text-6xl">
                  {category.name}
                </h1>

                <div className="mt-6 h-px w-16 bg-terracotta/60" />

                <p className="mt-6 max-w-[48ch] text-base leading-8 text-chai/65 md:text-lg">
                  {category.description}
                </p>

                {/* Small highlights */}
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-chai/10 bg-white/45 px-4 py-4">
                    <p className="text-lg">🍃</p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-chai/60">
                      Fresh Quality
                    </p>
                  </div>

                  <div className="rounded-2xl border border-chai/10 bg-white/45 px-4 py-4">
                    <p className="text-lg">☕</p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-chai/60">
                      Rich Flavour
                    </p>
                  </div>

                  <div className="hidden rounded-2xl border border-chai/10 bg-white/45 px-4 py-4 sm:block">
                    <p className="text-lg">📦</p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-chai/60">
                      Bulk Orders
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://api.whatsapp.com/send?phone=919926699991"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-chai px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream shadow-lg shadow-chai/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terracotta hover:shadow-xl"
                  >
                    Order on WhatsApp
                  </a>

                  <a
                    href="tel:+919926699991"
                    className="inline-flex items-center justify-center rounded-full border border-chai/20 bg-white/40 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-chai transition-all duration-300 hover:-translate-y-0.5 hover:border-chai hover:bg-white"
                  >
                    Call for Wholesale
                  </a>
                </div>

                <p className="mt-5 text-xs text-chai/45">
                  Retail & wholesale orders available • Siyaganj, Indore
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            PRODUCTS
        ========================== */}
        <section className="relative overflow-hidden bg-cream-deep px-5 py-20 md:px-8 md:py-24">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-chai/5" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-chai/5" />

          <div className="relative mx-auto max-w-7xl">
            {/* Section heading */}
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="label-eyebrow text-cardamom">
                  Explore the collection
                </span>

                <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight md:text-4xl lg:text-5xl">
                  {category.name} — full range
                </h2>
              </div>

              <p className="max-w-xs text-sm leading-6 text-chai/55 md:text-right">
                Premium quality products with retail and bulk ordering
                options.
              </p>
            </div>

            {/* Product Grid */}
            {category.products.length > 0 ? (
              <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {category.products.map((item) => (
                  <div
                    key={item.name}
                    className="group transition-transform duration-300 hover:-translate-y-1"
                  >
                    <ProductCard {...item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-3xl border border-chai/10 bg-cream px-6 py-14 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-chai/5 text-2xl">
                  🍵
                </div>

                <h3 className="mt-5 font-display text-2xl">
                  Products coming soon
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-chai/55">
                  We are updating our current stock. Call us for available
                  products and wholesale rates.
                </p>

                <a
                  href="tel:+919926699991"
                  className="mt-7 inline-flex rounded-full bg-chai px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-terracotta"
                >
                  Call Now
                </a>
              </div>
            )}
          </div>
        </section>

        {/* =========================
            BOTTOM CTA
        ========================== */}
        <section className="px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-chai px-7 py-12 text-center text-cream shadow-[0_20px_60px_rgba(66,45,29,0.15)] md:px-12 md:py-16">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cream/50">
              Janta Tea Company
            </span>

            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight md:text-4xl">
              Looking for the best rate for your order?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-cream/65">
              Whether you need a retail pack or a bulk quantity, talk to our
              team for the latest stock and wholesale pricing.
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
        </section>

        {/* =========================
            BACK TO CATEGORIES
        ========================== */}
        <div className="px-5 pb-14 text-center">
          <a
            href="/#categories"
            className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-chai/50 transition-colors hover:text-terracotta"
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