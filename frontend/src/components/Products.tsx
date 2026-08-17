// import { Link } from "@tanstack/react-router";
// import { ProductCard } from "@/components/ProductCard";

// import Greentea from "@/assets/teapowderjanta.avif";
// import Purpletea from "@/assets/freshjantagreen.avif";
// import Redtea from "@/assets/aromaticcardamonjantatea.avif";


// const products = [
//   {
//     name: "Janta Delicious Paan Tea",
//     notes: "Janta Economy Tea — Indore's favourite cup.",
//     price: "₹ 250 / kg",
//     image: Greentea,
//     badge: "Best seller",
//     rating: 5,
//     reviews: 128,
//   },
//   {
//     name: "Janta Green Tea",
//     notes:
//       "Dark, kadak chai with thick milk colour. Perfect for tapri-style tea.",
//     price: "₹ 350 / kg",
//     image: Purpletea,
//     badge: "Value pack",
//     rating: 4,
//     reviews: 96,
//   },
//   {
//     name: "Janta Aromatic Cardamon Tea",
//     notes:
//       "Light and mild, floral finish. Best without milk in the evening.",
//     price: "₹ 1,200 / kg",
//     image: Redtea,
//     badge: "Premium",
//     rating: 5,
//     reviews: 54,
//   },
// ];

import { Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export function Products() {
  const featuredProducts = products.slice(0, 3);

  return (
    <section
      id="products"
      className="bg-cream-deep px-5 py-20 sm:px-8 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="label-eyebrow text-cardamom">
              Most Sold
            </span>

            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Popular teas
            </h2>
          </div>

          <div className="text-sm text-chai/60">
            <p>Rates per kilo. Bulk rate on call.</p>

            <Link
              to="/shop"
              className="mt-2 inline-block font-semibold text-terracotta transition-colors hover:text-chai hover:underline"
            >
              View all products →
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((item) => (
            <ProductCard
              key={item.name}
              {...item}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// Modal-Key: wk-lzkc7Y0AdFf0PYQMZ7rx9N
// Modal-Secret: ws-HEOPeX6nD7E2hWrWtELAhv
//  Token ID wk-lzkc7Y0AdFf0PYQMZ7rx9N
// Token Secret ws-HEOPeX6nD7E2hWrWtELAhv

// Authorization: Bearer wk-lzkc7Y0AdFf0PYQMZ7rx9N.ws-HEOPeX6nD7E2hWrWtELAhv