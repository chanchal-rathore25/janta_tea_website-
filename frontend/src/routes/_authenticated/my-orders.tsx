import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { listMyOrders } from "@/lib/orders.functions";

const title = "My Orders — Janta Tea Company";
const description = "View your Janta Tea Company orders and their status.";

export const Route = createFileRoute("/_authenticated/my-orders")({
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
  component: MyOrders,
});

function MyOrders() {
  const fetchOrders = useServerFn(listMyOrders);
  const orders = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => fetchOrders(),
  });

  return (
    <div className="min-h-screen bg-cream text-chai">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <span className="label-eyebrow text-cardamom">Account</span>

        <h1 className="mt-3 font-display text-5xl">My Orders</h1>

        {orders.isPending && (
          <p className="mt-10 text-sm text-chai/60">Loading</p>
        )}

        {orders.isError && (
          <p className="mt-10 text-sm text-terracotta">
            We could not load your orders. Please try again.
          </p>
        )}

        {orders.data?.length === 0 && (
          <div className="mt-10 rounded-3xl border border-border bg-card px-8 py-16 text-center">
            <h2 className="font-display text-2xl">No orders yet</h2>
            <p className="mt-3 text-sm text-chai/60">
              Your placed orders will appear here.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-block rounded-full bg-chai px-7 py-3 text-[11px] font-semibold tracking-widest text-cream uppercase hover:bg-terracotta"
            >
              Explore Tea
            </Link>
          </div>
        )}

        <div className="mt-10 space-y-4">
          {orders.data?.map((order) => (
            <article
              key={order.id}
              className="rounded-3xl border border-border bg-card p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-xl">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="mt-1 text-xs text-chai/55">
                    {new Date(order.created_at).toLocaleDateString("en-IN")} ·{" "}
                    {order.payment_method.toUpperCase()}
                  </p>
                </div>
                <span className="rounded-full bg-cardamom/15 px-4 py-2 text-[11px] font-semibold tracking-widest text-cardamom uppercase">
                  {order.status}
                </span>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                {order.order_items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4 py-1 text-sm"
                  >
                    <span>{item.name} × {item.qty}</span>
                    <span>₹{Number(item.unit_price) * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between border-t border-border pt-4 font-semibold">
                <span>Total</span>
                <span>₹{Number(order.total)}</span>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}