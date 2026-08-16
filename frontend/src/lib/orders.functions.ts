import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const itemSchema = z.object({
  slug: z.string().max(120).optional(),
  name: z.string().trim().min(1).max(200),
  qty: z.number().int().min(1).max(999),
});

const orderSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(20),
  address: z.string().trim().min(5).max(400),
  city: z.string().trim().min(2).max(80),
  pincode: z.string().trim().min(4).max(10),
  payment_method: z.enum(["upi", "card", "netbanking", "cod"]),
  items: z.array(itemSchema).min(1).max(50),
});

export const createOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => orderSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    // Prices always come from the database, never from the client.
    const slugs = data.items.map((i) => i.slug).filter(Boolean) as string[];
    const { data: products, error: prodError } = await supabase
      .from("products")
      .select("slug, name, price_value, unit, image_url, category_slug")
      .in("slug", slugs.length ? slugs : ["__none__"]);
    if (prodError) throw new Error(prodError.message);

    const byName = new Map((products ?? []).map((p) => [p.name, p]));
    const bySlug = new Map((products ?? []).map((p) => [p.slug, p]));

    const lines = data.items.map((item) => {
      const p = (item.slug ? bySlug.get(item.slug) : undefined) ?? byName.get(item.name);
      if (!p) throw new Error(`Product not found: ${item.name}`);
      return {
        product_slug: p.slug,
        name: p.name,
        image_url: p.image_url,
        unit_price: Number(p.price_value),
        qty: item.qty,
      };
    });

    const subtotal = lines.reduce((s, l) => s + l.unit_price * l.qty, 0);
    const delivery_fee = subtotal >= 500 ? 0 : 60;

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        full_name: data.full_name,
        phone: data.phone,
        address: data.address,
        city: data.city,
        pincode: data.pincode,
        subtotal,
        delivery_fee,
        total: subtotal + delivery_fee,
        payment_method: data.payment_method,
        payment_status: data.payment_method === "cod" ? "pending" : "pending",
        status: "placed",
      })
      .select("id, total, delivery_fee, subtotal")
      .single();
    if (error) throw new Error(error.message);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(lines.map((l) => ({ ...l, order_id: order.id })));
    if (itemsError) throw new Error(itemsError.message);

    return order;
  });

export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });
