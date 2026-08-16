import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
          h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const [cats, prods] = await Promise.all([
    supabase
      .from("categories")
      .select("slug, name, tagline, description, brewing, highlights, image_url, sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("products")
      .select(
        "slug, name, category_slug, notes, price_value, unit, mrp, image_url, badge, rating, reviews, in_stock",
      )
      .order("reviews", { ascending: false }),
  ]);

  if (cats.error) throw new Error(cats.error.message);
  if (prods.error) throw new Error(prods.error.message);

  return { categories: cats.data ?? [], products: prods.data ?? [] };
});
