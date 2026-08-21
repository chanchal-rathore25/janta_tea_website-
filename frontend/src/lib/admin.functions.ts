import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin only");
}

export const getMyRole = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: Boolean(data) };
  });

export const adminListOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminUpdateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["placed", "packed", "shipped", "delivered", "cancelled"]),
        payment_status: z.enum(["pending", "paid", "failed", "refunded"]).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const patch = {
      status: data.status,
      payment_status: data.payment_status ?? "pending",
    };
    const { error } = await context.supabase.from("orders").update(patch).eq("id", data.id);

    if (error) throw new Error(error.message);
    return { ok: true };
  });

const productSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "slug: only lowercase letters, numbers, and dashes are allowed"),
  name: z.string().trim().min(2).max(200),
  category_slug: z.string().trim().min(2).max(120),
  notes: z.string().trim().max(600).optional().nullable(),
  price_value: z.number().min(0).max(1_000_000),
  unit: z.string().trim().min(1).max(20),
  mrp: z.number().min(0).max(1_000_000).optional().nullable(),
  image_url: z.string().trim().max(500).optional().nullable(),
  badge: z.string().trim().max(40).optional().nullable(),
  in_stock: z.boolean().optional(),
});

export const adminSaveProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => productSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const row = {
      slug: data.slug,
      name: data.name,
      category_slug: data.category_slug,
      notes: data.notes ?? null,
      price_value: data.price_value,
      unit: data.unit,
      mrp: data.mrp ?? null,
      image_url: data.image_url ?? null,
      badge: data.badge ?? null,
      in_stock: data.in_stock ?? true,
    };
    const { error } = await context.supabase.from("products").upsert(row, { onConflict: "slug" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ slug: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("products").delete().eq("slug", data.slug);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const [orders, products] = await Promise.all([
      context.supabase.from("orders").select("total, status"),
      context.supabase.from("products").select("slug"),
    ]);
    const rows = (orders.data ?? []) as { total: number; status: string }[];
    return {
      orderCount: rows.length,
      revenue: rows
        .filter((o) => o.status !== "cancelled")
        .reduce((s, o) => s + Number(o.total), 0),
      pending: rows.filter((o) => o.status === "placed").length,
      productCount: (products.data ?? []).length,
    };
  });
