import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/products";


const title = "Shop Tea & Coffee — Janta Tea Company, Indore";
const description =
  "Browse Assam CTC, Darjeeling, masala, green and cardamom tea plus fresh coffee. Filter by category, search by name and order on WhatsApp from Siyaganj, Indore.";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

const sorts = [
  { id: "popular", label: "Most popular" },
  { id: "low", label: "Price: low to high" },
  { id: "high", label: "Price: high to low" },
] as const;

function Shop() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]["id"]>("popular");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = products.filter((p) => {
      const inCat = active === "All" || p.category === active;
      const inQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.notes.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return inCat && inQuery;
    });
    const sorted = [...filtered];
    if (sort === "low") sorted.sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "high") sorted.sort((a, b) => b.priceValue - a.priceValue);
    if (sort === "popular") sorted.sort((a, b) => b.reviews - a.reviews);
    return sorted;
  }, [query, active, sort]);

  const tabs = ["All", ...categories];

  return (
    <div className="min-h-screen bg-cream text-chai">
      <Navbar />

      <main className="px-6 pb-28">
        <section className="mx-auto max-w-7xl pt-12 pb-8">
          <span className="label-eyebrow text-cardamom">Our shop</span>
          <h1 className="mt-3 font-display text-5xl text-balance md:text-6xl">
            All our teas &amp; coffee
          </h1>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-chai/70">
            Category chuniye ya naam se search kariye. Sab rates per kilo hain — bulk ke liye call
            karke aur behtar rate mil jayega.
          </p>
        </section>

        <section className="mx-auto max-w-7xl">
          <div className="sticky top-[104px] z-30 -mx-6 border-y border-border bg-cream/90 px-6 py-4 backdrop-blur-md">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex w-full items-center gap-3 lg:max-w-sm">
                <label htmlFor="tea-search" className="sr-only">
                  Search teas
                </label>
                <input
                  id="tea-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tea, coffee, elaichi…"
                  className="w-full rounded-full border border-border bg-card px-5 py-3 text-sm text-chai outline-none transition-colors placeholder:text-chai/40 focus:border-terracotta"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto">
                {sorts.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSort(s.id)}
                    className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-semibold tracking-widest uppercase transition-colors ${
                      sort === s.id
                        ? "bg-chai text-cream"
                        : "border border-border text-chai/60 hover:border-chai"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`shrink-0 rounded-full px-5 py-2 text-sm transition-colors ${
                    active === tab
                      ? "bg-terracotta text-cream"
                      : "border border-border bg-card text-chai/70 hover:border-terracotta"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-8 text-sm text-chai/55">
            {list.length} {list.length === 1 ? "product" : "products"} found
            {active !== "All" && ` in ${active}`}
          </p>

          {list.length > 0 ? (
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((item) => (
                <ProductCard key={item.name} {...item} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-border bg-card px-8 py-16 text-center">
              <h2 className="font-display text-2xl">Kuch nahi mila</h2>
              <p className="mx-auto mt-3 max-w-[40ch] text-sm text-chai/60">
                Search badal ke dekhiye, ya humein call kariye — shop mein aur bhi blends milte hain.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setActive("All");
                }}
                className="mt-6 rounded-full bg-chai px-7 py-3 text-[11px] font-semibold tracking-widest text-cream uppercase transition-colors hover:bg-terracotta"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />

      <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-border bg-card/95 backdrop-blur-md lg:hidden">
        <a
          href="tel:+919926699991"
          className="flex-1 py-4 text-center text-xs font-semibold tracking-widest uppercase"
        >
          Call now
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=919926699991"
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-chai py-4 text-center text-xs font-semibold tracking-widest text-cream uppercase"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
