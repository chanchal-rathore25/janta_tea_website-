import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { listMyOrders } from "@/lib/orders.functions";

const title = "Mere orders — Janta Tea Company";
const description = "Apne Janta Tea Company orders aur unka status dekhiye.";

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
  const { data, isLoading } = useQuery({ queryKey: ["my-orders"], queryFn: () => fetchOrders() });

  return (
    <div className="min-h-screen bg-cream text-chai">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <span className="label-eyebrow text-cardamom">Account</span>
        <h1 className="mt-3 font-display text-5xl">Mere orders</h1>

        {isLoading && <p className="mt-8 text-sm text-chai/60">Load ho raha hai...</p>}

        {!isLoading && (data ?? []).length === 0 && (
          <div className="mt-10 rounded-3xl border border-border bg-card px-8 py-16 text-center">
            <h2 className="font-display text-2xl">Abhi koi order nahi</h2>
            <Link
              to="/shop"
              className="mt-6 inline-block rounded-full bg-chai px-7 py-3 text-[11px] font-semibold tracking-widest text-cream uppercase hover:bg-terracotta"
            >
              Shop dekhein
            </Link>
          </div>
        )}

        <div className="mt-8 space-y-4">
          {(data ?? []).map((order) => (
            <article key={order.id} className="rounded-3xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-xl">₹{Number(order.total)}</p>
                  <p className="text-xs text-chai/50">
                    {new Date(order.created_at).toLocaleString("en-IN")} ·{" "}
                    {order.payment_method.toUpperCase()}
                  </p>
                </div>
                <span className="rounded-full bg-cream px-4 py-1 text-[11px] font-semibold tracking-widest uppercase">
                  {order.status}
                </span>
              </div>
              <ul className="mt-4 space-y-1 border-t border-border pt-4 text-sm text-chai/70">
                {(order.order_items ?? []).map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.name} × {item.qty}
                    </span>
                    <span>₹{Number(item.unit_price) * item.qty}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
