import { queryOptions } from "@tanstack/react-query";

import { listCatalog } from "./catalog.functions";
import teaMasala from "@/assets/tea-masala.jpg";
import teaAssam from "@/assets/tea-assam.jpg";
import teaDarjeeling from "@/assets/tea-darjeeling.jpg";
import catTeaLeaf from "@/assets/cat-tea-leaf.jpg";
import catTeaPowder from "@/assets/cat-tea-powder.jpg";
import catGreenTea from "@/assets/cat-green-tea.jpg";
import catCardamomTea from "@/assets/cat-cardamom-tea.jpg";
import catCardamom from "@/assets/cat-cardamom.jpg";
import catCoffee from "@/assets/cat-coffee.jpg";

export type DbCategory = {
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  brewing: string | null;
  highlights: string[];
  image_url: string | null;
  sort_order: number;
};

export type DbProduct = {
  slug: string;
  name: string;
  category_slug: string;
  notes: string | null;
  price_value: number;
  unit: string;
  mrp: number | null;
  image_url: string | null;
  badge: string | null;
  rating: number;
  reviews: number;
  in_stock: boolean;
};

const categoryFallback: Record<string, string> = {
  "tea-leaf": catTeaLeaf,
  "tea-powder": catTeaPowder,
  "green-tea": catGreenTea,
  "cardamom-tea": catCardamomTea,
  "cardamom-flavour": catCardamom,
  coffee: catCoffee,
};

const productFallback: Record<string, string> = {
  "masala-chai-special": teaMasala,
  "assam-ctc-gold": teaAssam,
  "darjeeling-first-flush": teaDarjeeling,
  "nilgiri-leaf-everyday": catTeaLeaf,
  "kadak-dust-tea": catTeaPowder,
  "green-tea-whole-leaf": catGreenTea,
  "lemon-green-tea": catGreenTea,
  "elaichi-chai-blend": catCardamomTea,
  "pure-cardamom-flavour": catCardamom,
  "filter-coffee-powder": catCoffee,
  "instant-coffee-blend": catCoffee,
  "hotel-special-ctc": teaAssam,
};

/** Storage paths are served through a public streaming route. */
export function resolveImage(url: string | null | undefined, fallback: string) {
  if (!url) return fallback;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) return url;
  return `/api/public/product-image/${url}`;
}

export function categoryImage(c: Pick<DbCategory, "slug" | "image_url">) {
  return resolveImage(c.image_url, categoryFallback[c.slug] ?? catTeaLeaf);
}

export function productImage(p: Pick<DbProduct, "slug" | "category_slug" | "image_url">) {
  return resolveImage(
    p.image_url,
    productFallback[p.slug] ?? categoryFallback[p.category_slug] ?? catTeaLeaf,
  );
}

export function formatPrice(p: Pick<DbProduct, "price_value" | "unit">) {
  return `₹${Number(p.price_value)} / ${p.unit}`;
}

/** Shape expected by <ProductCard />. */
export function toCardProps(p: DbProduct) {
  return {
    name: p.name,
    notes: p.notes ?? "",
    price: formatPrice(p),
    priceValue: Number(p.price_value),
    mrp: p.mrp ? `₹${Number(p.mrp)}` : undefined,
    image: productImage(p),
    badge: p.badge ?? undefined,
    rating: Number(p.rating),
    reviews: p.reviews,
    slug: p.slug,
  };
}

export const catalogQuery = queryOptions({
  queryKey: ["catalog"],
  queryFn: () => listCatalog() as Promise<{ categories: DbCategory[]; products: DbProduct[] }>,
  staleTime: 60_000,
});
