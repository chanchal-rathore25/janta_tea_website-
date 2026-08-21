import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { catalogQuery, productImage, type DbProduct } from "@/lib/catalog";
import {
  adminDeleteProduct,
  adminListOrders,
  adminSaveProduct,
  adminStats,
  adminUpdateOrderStatus,
} from "@/lib/admin.functions";

const title = "Admin Dashboard — Janta Tea Company";
const description = "Manage products, images, and orders.";

export const Route = createFileRoute("/_authenticated/admin")({
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
  component: AdminPage,
});

const emptyProduct = {
  slug: "",
  name: "",
  category_slug: "tea-leaf",
  notes: "",
  price_value: 0,
  unit: "kg",
  mrp: 0,
  image_url: "",
  badge: "",
  in_stock: true,
};

const statuses = [
  "placed",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
] as const;

function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const qc = useQueryClient();
  const [tab, setTab] = useState<"orders" | "products">("orders");
  const [form, setForm] = useState({ ...emptyProduct });
  const [uploading, setUploading] = useState(false);

  const fetchStats = useServerFn(adminStats);
  const fetchOrders = useServerFn(adminListOrders);
  const saveProduct = useServerFn(adminSaveProduct);
  const deleteProduct = useServerFn(adminDeleteProduct);
  const updateStatus = useServerFn(adminUpdateOrderStatus);

  const stats = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fetchStats(),
    enabled: isAdmin,
  });

  const orders = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => fetchOrders(),
    enabled: isAdmin,
  });

  const catalog = useQuery(catalogQuery);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-cream text-chai">
        <Navbar />

        <main className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="font-display text-4xl">Admin Access Only</h1>

          <p className="mt-3 text-sm text-chai/60">
            Your account does not have admin access. Please contact the owner
            to request the admin role.
          </p>
        </main>

        <Footer />
      </div>
    );
  }

  const input =
    "w-full rounded-full border border-border bg-card px-5 py-3 text-sm outline-none focus:border-terracotta";

  const handleUpload = async (file: File) => {
    setUploading(true);

    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${form.slug || "product"}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, file, {
        cacheControl: "31536000",
        upsert: true,
      });

    setUploading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setForm((f) => ({
      ...f,
      image_url: path,
    }));

    toast.success("Image uploaded successfully");
  };

  return (
    <div className="min-h-screen bg-cream text-chai">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <span className="label-eyebrow text-cardamom">Admin</span>

        <h1 className="mt-3 font-display text-5xl">Dashboard</h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {[
            {
              label: "Total Orders",
              value: stats.data?.orderCount ?? 0,
            },
            {
              label: "Revenue",
              value: `₹${stats.data?.revenue ?? 0}`,
            },
            {
              label: "New Orders",
              value: stats.data?.pending ?? 0,
            },
            {
              label: "Products",
              value: stats.data?.productCount ?? 0,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-3xl border border-border bg-card p-5"
            >
              <p className="text-[11px] tracking-widest text-chai/45 uppercase">
                {s.label}
              </p>

              <p className="mt-2 font-display text-3xl">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex gap-2">
          {(["orders", "products"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-6 py-3 text-[11px] font-semibold tracking-widest uppercase ${
                tab === t ? "bg-chai text-cream" : "border border-border"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "orders" && (
          <div className="mt-6 space-y-4">
            {(orders.data ?? []).map((order) => (
              <article
                key={order.id}
                className="rounded-3xl border border-border bg-card p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-xl">
                      {order.full_name} · ₹{Number(order.total)}
                    </p>

                    <p className="text-xs text-chai/55">
                      {order.phone} · {order.address}, {order.city}{" "}
                      {order.pincode}
                    </p>

                    <p className="mt-1 text-xs text-chai/45">
                      {new Date(order.created_at).toLocaleString("en-IN")} ·{" "}
                      {order.payment_method.toUpperCase()} · payment{" "}
                      {order.payment_status}
                    </p>
                  </div>

                  <select
                    value={order.status}
                    onChange={async (e) => {
                      await updateStatus({
                        data: {
                          id: order.id,
                          status: e.target.value as (typeof statuses)[number],
                          payment_status: order.payment_status as "pending",
                        },
                      });

                      toast.success("Status updated successfully");

                      void qc.invalidateQueries({
                        queryKey: ["admin-orders"],
                      });
                    }}
                    className="rounded-full border border-border bg-cream px-4 py-2 text-xs"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <ul className="mt-4 space-y-1 border-t border-border pt-4 text-sm text-chai/70">
                  {(order.order_items ?? []).map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between"
                    >
                      <span>
                        {item.name} × {item.qty}
                      </span>

                      <span>
                        ₹{Number(item.unit_price) * item.qty}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            {(orders.data ?? []).length === 0 && (
              <p className="text-sm text-chai/60">
                No orders have been placed yet.
              </p>
            )}
          </div>
        )}

        {tab === "products" && (
          <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <form
              className="h-fit space-y-3 rounded-3xl border border-border bg-card p-6"
              onSubmit={async (e) => {
                e.preventDefault();

                try {
                  await saveProduct({
                    data: {
                      slug: form.slug,
                      name: form.name,
                      category_slug: form.category_slug,
                      notes: form.notes || null,
                      price_value: Number(form.price_value),
                      unit: form.unit,
                      mrp: form.mrp ? Number(form.mrp) : null,
                      image_url: form.image_url || null,
                      badge: form.badge || null,
                      in_stock: form.in_stock,
                    },
                  });

                  toast.success("Product saved successfully");

                  setForm({ ...emptyProduct });

                  void qc.invalidateQueries({
                    queryKey: ["catalog"],
                  });

                  void qc.invalidateQueries({
                    queryKey: ["admin-stats"],
                  });
                } catch (err) {
                  toast.error(
                    err instanceof Error
                      ? err.message
                      : "Failed to save product"
                  );
                }
              }}
            >
              <h2 className="font-display text-2xl">
                Add / Edit Product
              </h2>

              <input
                required
                value={form.slug}
                onChange={(e) =>
                  setForm({
                    ...form,
                    slug: e.target.value,
                  })
                }
                placeholder="Slug (e.g. masala-chai-special)"
                className={input}
              />

              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                placeholder="Product Name"
                className={input}
              />

              <select
                value={form.category_slug}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category_slug: e.target.value,
                  })
                }
                className={input}
              >
                {(catalog.data?.categories ?? []).map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>

              <textarea
                value={form.notes}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notes: e.target.value,
                  })
                }
                placeholder="Description"
                rows={3}
                className="w-full rounded-2xl border border-border bg-card px-5 py-3 text-sm outline-none focus:border-terracotta"
              />

              <div className="grid grid-cols-3 gap-2">
                <input
                  required
                  type="number"
                  value={form.price_value}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price_value: Number(e.target.value),
                    })
                  }
                  placeholder="Price"
                  className={input}
                />

                <input
                  value={form.unit}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      unit: e.target.value,
                    })
                  }
                  placeholder="Unit"
                  className={input}
                />

                <input
                  type="number"
                  value={form.mrp}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      mrp: Number(e.target.value),
                    })
                  }
                  placeholder="MRP"
                  className={input}
                />
              </div>

              <input
                value={form.badge}
                onChange={(e) =>
                  setForm({
                    ...form,
                    badge: e.target.value,
                  })
                }
                placeholder="Badge (optional)"
                className={input}
              />

              <div>
                <label className="text-[11px] tracking-widest text-chai/45 uppercase">
                  Product Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      void handleUpload(file);
                    }
                  }}
                  className="mt-2 w-full text-xs"
                />

                {uploading && (
                  <p className="mt-1 text-xs text-chai/50">
                    Uploading...
                  </p>
                )}

                {form.image_url && (
                  <img
                    src={productImage({
                      slug: form.slug,
                      category_slug: form.category_slug,
                      image_url: form.image_url,
                    })}
                    alt="Preview"
                    className="mt-3 h-24 w-24 rounded-xl object-cover"
                  />
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-chai py-3 text-[11px] font-semibold tracking-widest text-cream uppercase hover:bg-terracotta"
              >
                Save Product
              </button>
            </form>

            <div className="space-y-3">
              {(catalog.data?.products ?? []).map((p: DbProduct) => (
                <div
                  key={p.slug}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  <img
                    src={productImage(p)}
                    alt={p.name}
                    className="h-14 w-14 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-semibold">
                      {p.name}
                    </p>

                    <p className="text-xs text-chai/50">
                      ₹{Number(p.price_value)} / {p.unit} ·{" "}
                      {p.category_slug}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setForm({
                        slug: p.slug,
                        name: p.name,
                        category_slug: p.category_slug,
                        notes: p.notes ?? "",
                        price_value: Number(p.price_value),
                        unit: p.unit,
                        mrp: Number(p.mrp ?? 0),
                        image_url: p.image_url ?? "",
                        badge: p.badge ?? "",
                        in_stock: p.in_stock,
                      })
                    }
                    className="rounded-full border border-border px-4 py-2 text-[11px] uppercase hover:border-chai"
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      await deleteProduct({
                        data: {
                          slug: p.slug,
                        },
                      });

                      toast.success("Product deleted successfully");

                      void qc.invalidateQueries({
                        queryKey: ["catalog"],
                      });
                    }}
                    className="rounded-full border border-border px-4 py-2 text-[11px] text-terracotta uppercase hover:border-terracotta"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}