import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { catalogQuery, formatPrice, productImage, toCardProps, type DbProduct } from "@/lib/catalog";

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(catalogQuery);
    const product = data.products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { name: product.name, notes: product.notes ?? "" };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product not found — Janta Tea Co." },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.name} — Janta Tea Company, Indore`;
    const description =
      loaderData.notes ||
      `Buy ${loaderData.name} fresh from Janta Tea Company, Siyaganj Indore. Retail and wholesale rates.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  errorComponent: ProductMissing,
  notFoundComponent: ProductMissing,
  component: ProductPage,
});

function ProductMissing() {
  return (
    <div className="min-h-screen bg-cream text-chai">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Ye product nahi mila</h1>
        <p className="mt-3 text-chai/65">Shayad ye hata diya gaya hai. Poora shop dekh lijiye.</p>
        <Link to="/shop" className="mt-6 inline-block font-semibold text-terracotta hover:underline">
          Poora shop dekhein →
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-sm text-terracotta" aria-hidden="true">
      {"★★★★★".slice(0, Math.round(rating))}
      <span className="text-chai/25">{"★★★★★".slice(Math.round(rating))}</span>
    </span>
  );
}

function ProductPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(catalogQuery);
  const product = data.products.find((p) => p.slug === slug);
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return <ProductMissing />;

  const category = data.categories.find((c) => c.slug === product.category_slug);
  const related = data.products
    .filter((p) => p.category_slug === product.category_slug && p.slug !== product.slug)
    .slice(0, 3);
  const image = productImage(product);
  const price = formatPrice(product);
  const priceValue = Number(product.price_value);
  const save = product.mrp ? Math.max(0, Number(product.mrp) - priceValue) : 0;

  const handleAdd = (goToCart: boolean) => {
    add({ name: product.name, slug: product.slug, price, priceValue, image }, qty);
    if (goToCart) setOpen(true);
    else
      toast.success(`${qty} × ${product.name} cart mein add ho gaya`, {
        action: { label: "Cart dekhein", onClick: () => setOpen(true) },
      });
  };

  return (
    <div className="min-h-screen bg-cream text-chai">
      <Navbar />

      <main className="pb-28">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 pt-8 text-xs text-chai/55">
          <Link to="/" className="hover:text-terracotta">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link to="/shop" className="hover:text-terracotta">
            Shop
          </Link>
          {category && (
            <>
              <span className="px-2">/</span>
              <Link
                to="/category/$slug"
                params={{ slug: category.slug }}
                className="hover:text-terracotta"
              >
                {category.name}
              </Link>
            </>
          )}
          <span className="px-2">/</span>
          <span className="text-chai">{product.name}</span>
        </nav>

        <section className="mx-auto mt-8 grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-cream-deep">
            {product.badge && (
              <span className="absolute top-5 left-5 rounded-full bg-chai px-4 py-1.5 text-[10px] font-semibold tracking-widest text-cream uppercase">
                {product.badge}
              </span>
            )}
            <img
              src={image}
              alt={`${product.name} — tea from Janta Tea Company, Indore`}
              width={1000}
              height={1000}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <Stars rating={Number(product.rating)} />
              <span className="text-xs text-chai/50">{product.reviews} reviews</span>
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-semibold tracking-widest uppercase ${
                  product.in_stock ? "bg-cardamom/15 text-cardamom" : "bg-chai/10 text-chai/50"
                }`}
              >
                {product.in_stock ? "In stock" : "Out of stock"}
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl text-balance md:text-5xl">{product.name}</h1>
            <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-chai/70">
              {product.notes ?? "Fresh tea, packed the day you order."}
            </p>

            <div className="mt-7 flex flex-wrap items-baseline gap-3">
              <span className="font-display text-4xl text-chai">{price}</span>
              {product.mrp && (
                <span className="text-base text-chai/40 line-through">₹{Number(product.mrp)}</span>
              )}
              {save > 0 && (
                <span className="rounded-full bg-terracotta/10 px-3 py-1 text-xs font-semibold text-terracotta">
                  ₹{save} bachat
                </span>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-border bg-card">
                <button
                  type="button"
                  aria-label="Quantity kam karein"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-5 py-3 text-lg text-chai/70 hover:text-terracotta"
                >
                  −
                </button>
                <span className="min-w-10 text-center font-semibold">{qty}</span>
                <button
                  type="button"
                  aria-label="Quantity badhaein"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  className="px-5 py-3 text-lg text-chai/70 hover:text-terracotta"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-chai/60">
                Total <span className="font-semibold text-chai">₹{priceValue * qty}</span>
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={!product.in_stock}
                onClick={() => handleAdd(false)}
                className="rounded-full bg-chai px-8 py-4 text-[11px] font-semibold tracking-widest text-cream uppercase transition-colors hover:bg-terracotta disabled:cursor-not-allowed disabled:opacity-40"
              >
                Add to cart
              </button>
              <button
                type="button"
                disabled={!product.in_stock}
                onClick={() => handleAdd(true)}
                className="rounded-full border border-chai px-8 py-4 text-[11px] font-semibold tracking-widest uppercase transition-colors hover:bg-chai hover:text-cream disabled:cursor-not-allowed disabled:opacity-40"
              >
                Abhi order karein
              </button>
              <a
                href={`https://api.whatsapp.com/send?phone=919926699991&text=${encodeURIComponent(
                  `Namaste, mujhe ${product.name} chahiye (${qty} ${product.unit}).`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border px-8 py-4 text-[11px] font-semibold tracking-widest uppercase transition-colors hover:border-chai"
              >
                WhatsApp par poochhein
              </a>
            </div>

            <dl className="mt-10 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
              {[
                ["Packing", `Fresh packed, ${product.unit} ke hisaab se`],
                ["Delivery", "Indore mein ₹500+ par free"],
                ["Bulk rate", "10 kg se upar special rate"],
                ["Category", category?.name ?? product.category_slug],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label-eyebrow text-cardamom">{k}</dt>
                  <dd className="mt-1 text-sm text-chai/70">{v}</dd>
                </div>
              ))}
            </dl>

            {category?.brewing && (
              <div className="mt-8 rounded-2xl bg-cream-deep px-6 py-5 text-sm leading-relaxed text-chai/70">
                <span className="font-semibold text-chai">Banane ka tarika: </span>
                {category.brewing}
              </div>
            )}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mx-auto mt-24 max-w-7xl px-6">
            <h2 className="font-display text-3xl">Isi tarah ki teas</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p: DbProduct) => (
                <ProductCard key={p.slug} {...toCardProps(p)} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
