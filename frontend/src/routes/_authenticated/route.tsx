
import { createFileRoute, Link } from "@tanstack/react-router";

const title = "Order Confirmed — Janta Tea Company";
const description = "Your Janta Tea Company order has been confirmed.";

type OrderSuccessSearch = {
  orderId: string;
  paymentId?: string;
  amount: number;
  paymentMethod?: "online" | "cod";
};

export const Route = createFileRoute("/_authenticated")({
  validateSearch: (search): OrderSuccessSearch => ({
    orderId: String(search.orderId ?? ""),
    paymentId: search.paymentId
      ? String(search.paymentId)
      : undefined,
    amount: Number(search.amount ?? 0),
    paymentMethod:
      search.paymentMethod === "cod" ? "cod" : "online",
  }),

  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
    ],
  }),

  component: OrderSuccess,
});

function OrderSuccess() {
  const { orderId, paymentId, amount, paymentMethod } =
    Route.useSearch();

  return (
    <div className="min-h-screen bg-cream text-chai">
      <main className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6 py-16">
        <div className="w-full rounded-3xl border border-border bg-card p-8 text-center shadow-sm md:p-12">
          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cardamom/15">
            <span className="text-4xl text-cardamom">✓</span>
          </div>

          <span className="label-eyebrow mt-8 block text-cardamom">
            Order Confirmed
          </span>

          <h1 className="mt-3 font-display text-4xl md:text-5xl">
            Thank you for your order!
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-chai/60">
            Your order has been successfully placed. We’ll start
            preparing your tea shortly.
          </p>

          {/* Order Details */}
          <div className="mt-8 rounded-2xl border border-border bg-cream/50 p-5 text-left">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              <span className="text-sm text-chai/60">Order ID</span>
              <span className="font-mono text-sm font-semibold">
                #{orderId.slice(0, 8)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 py-4 border-b border-border">
              <span className="text-sm text-chai/60">Amount</span>
              <span className="font-semibold">
                ₹{amount}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 pt-4">
              <span className="text-sm text-chai/60">
                Payment
              </span>
              <span className="text-sm font-semibold uppercase">
                {paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "Online Payment"}
              </span>
            </div>

            {paymentId && (
              <div className="mt-4 border-t border-border pt-4">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-chai/60">
                    Payment ID
                  </span>
                  <span className="max-w-[220px] break-all text-right font-mono text-xs">
                    {paymentId}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/_authenticated/my-orders"
              className="rounded-full bg-chai px-7 py-3 text-[11px] font-semibold tracking-widest text-cream uppercase transition hover:bg-terracotta"
            >
              My Orders
            </Link>

            <Link
              to="/shop"
              className="rounded-full border border-chai/20 px-7 py-3 text-[11px] font-semibold tracking-widest text-chai uppercase transition hover:border-chai hover:bg-chai hover:text-cream"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
