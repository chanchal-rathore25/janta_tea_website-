import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  catalogQuery,
  productImage,
  type DbProduct,
} from "@/lib/catalog";

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
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

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

    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${form.slug || "product"}-${Date.now()}.${ext}`;

      const { error } = await supabase.storage
        .from("product-images")
        .upload(path, file, {
          cacheControl: "31536000",
          upsert: true,
        });

      if (error) {
        throw new Error(error.message);
      }

      setForm((current) => ({
        ...current,
        image_url: path,
      }));

      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Image upload failed",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleStatusChange = async (
    orderId: string,
    newStatus: (typeof statuses)[number],
  ) => {
    setUpdatingOrderId(orderId);

    try {
      const result = await updateStatus({
        data: {
          id: orderId,
          status: newStatus,
        },
      });

      console.log("Order status update response:", result);

      await qc.invalidateQueries({
        queryKey: ["admin-orders"],
      });

      await qc.invalidateQueries({
        queryKey: ["admin-stats"],
      });

      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Order status update failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update order status",
      );

      await qc.invalidateQueries({
        queryKey: ["admin-orders"],
      });
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-chai">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <span className="label-eyebrow text-cardamom">Admin</span>

        <h1 className="mt-3 font-display text-5xl">Dashboard</h1>

        {(stats.isError || orders.isError) && (
          <div className="mt-6 rounded-2xl border border-red-300 bg-red-50 p-5 text-red-700">
            <h2 className="font-semibold">Dashboard data error</h2>

            {stats.isError && (
              <p className="mt-2 text-sm">
                Stats: {stats.error.message}
              </p>
            )}

            {orders.isError && (
              <p className="mt-2 text-sm">
                Orders: {orders.error.message}
              </p>
            )}

            <button
              onClick={() => {
                void stats.refetch();
                void orders.refetch();
              }}
              className="mt-4 rounded-full bg-red-700 px-5 py-2 text-sm text-white"
            >
              Retry
            </button>
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-border bg-card p-5"
            >
              <p className="text-[11px] tracking-widest text-chai/45 uppercase">
                {item.label}
              </p>

              <p className="mt-2 font-display text-3xl">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex gap-2">
          {(["orders", "products"] as const).map((currentTab) => (
            <button
              key={currentTab}
              onClick={() => setTab(currentTab)}
              className={`rounded-full px-6 py-3 text-[11px] font-semibold tracking-widest uppercase ${
                tab === currentTab
                  ? "bg-chai text-cream"
                  : "border border-border"
              }`}
            >
              {currentTab}
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
                      {order.payment_method.toUpperCase()} · Payment{" "}
                      {order.payment_status}
                    </p>

                    <p className="mt-2 text-xs text-chai/60">
                      Order ID: {order.id}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={`status-${order.id}`}
                      className="text-xs text-chai/60"
                    >
                      Order Status
                    </label>

                    <select
                      id={`status-${order.id}`}
                      value={order.status}
                      disabled={updatingOrderId === order.id}
                      onChange={(event) => {
                        void handleStatusChange(
                          order.id,
                          event.target.value as (typeof statuses)[number],
                        );
                      }}
                      className="rounded-full border border-border bg-cream px-4 py-2 text-xs disabled:cursor-wait disabled:opacity-50"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    {updatingOrderId === order.id && (
                      <p className="text-xs text-chai/60">
                        Updating status...
                      </p>
                    )}
                  </div>
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

            {orders.isLoading && (
              <p className="text-sm text-chai/60">Loading orders...</p>
            )}

            {!orders.isLoading && (orders.data ?? []).length === 0 && (
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
              onSubmit={async (event) => {
                event.preventDefault();

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

                  await qc.invalidateQueries({
                    queryKey: ["catalog"],
                  });

                  await qc.invalidateQueries({
                    queryKey: ["admin-stats"],
                  });
                } catch (error) {
                  toast.error(
                    error instanceof Error
                      ? error.message
                      : "Failed to save product",
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
                onChange={(event) =>
                  setForm({
                    ...form,
                    slug: event.target.value,
                  })
                }
                placeholder="Slug (e.g. masala-chai-special)"
                className={input}
              />

              <input
                required
                value={form.name}
                onChange={(event) =>
                  setForm({
                    ...form,
                    name: event.target.value,
                  })
                }
                placeholder="Product Name"
                className={input}
              />

              <select
                value={form.category_slug}
                onChange={(event) =>
                  setForm({
                    ...form,
                    category_slug: event.target.value,
                  })
                }
                className={input}
              >
                {(catalog.data?.categories ?? []).map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>

              <textarea
                value={form.notes}
                onChange={(event) =>
                  setForm({
                    ...form,
                    notes: event.target.value,
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
                  min="0"
                  value={form.price_value}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      price_value: Number(event.target.value),
                    })
                  }
                  placeholder="Price"
                  className={input}
                />

                <input
                  required
                  value={form.unit}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      unit: event.target.value,
                    })
                  }
                  placeholder="Unit"
                  className={input}
                />

                <input
                  type="number"
                  min="0"
                  value={form.mrp}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      mrp: Number(event.target.value),
                    })
                  }
                  placeholder="MRP"
                  className={input}
                />
              </div>

              <input
                value={form.badge}
                onChange={(event) =>
                  setForm({
                    ...form,
                    badge: event.target.value,
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
                  onChange={(event) => {
                    const file = event.target.files?.[0];

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
                    alt="Product preview"
                    className="mt-3 h-24 w-24 rounded-xl object-cover"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full rounded-full bg-chai py-3 text-[11px] font-semibold tracking-widest text-cream uppercase hover:bg-terracotta disabled:opacity-50"
              >
                Save Product
              </button>
            </form>

            <div className="space-y-3">
              {(catalog.data?.products ?? []).map((product: DbProduct) => (
                <div
                  key={product.slug}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  <img
                    src={productImage(product)}
                    alt={product.name}
                    className="h-14 w-14 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-semibold">{product.name}</p>

                    <p className="text-xs text-chai/50">
                      ₹{Number(product.price_value)} / {product.unit} ·{" "}
                      {product.category_slug}
                    </p>

                    <p className="text-xs text-chai/50">
                      {product.in_stock ? "In stock" : "Out of stock"}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setForm({
                        slug: product.slug,
                        name: product.name,
                        category_slug: product.category_slug,
                        notes: product.notes ?? "",
                        price_value: Number(product.price_value),
                        unit: product.unit,
                        mrp: Number(product.mrp ?? 0),
                        image_url: product.image_url ?? "",
                        badge: product.badge ?? "",
                        in_stock: product.in_stock,
                      })
                    }
                    className="rounded-full border border-border px-4 py-2 text-[11px] uppercase hover:border-chai"
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      const confirmed = window.confirm(
                        `Delete "${product.name}"? This action cannot be undone.`,
                      );

                      if (!confirmed) return;

                      try {
                        await deleteProduct({
                          data: {
                            slug: product.slug,
                          },
                        });

                        toast.success("Product deleted successfully");

                        await qc.invalidateQueries({
                          queryKey: ["catalog"],
                        });

                        await qc.invalidateQueries({
                          queryKey: ["admin-stats"],
                        });
                      } catch (error) {
                        toast.error(
                          error instanceof Error
                            ? error.message
                            : "Failed to delete product",
                        );
                      }
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