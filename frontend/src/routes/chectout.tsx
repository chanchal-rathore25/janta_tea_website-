import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { createOrder } from "@/lib/orders.functions";

const title = "Checkout — Janta Tea Company, Indore";

const description =
  "Place your order from Janta Tea Company. Fill in your delivery details and send your order directly on WhatsApp.";

const ADMIN_WHATSAPP = "7470727233";

export const Route = createFileRoute("/chectout")({
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
  component: Checkout,
});

function Checkout() {
  const { items, total, clear } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const delivery = total >= 500 || total === 0 ? 0 : 60;
  const grandTotal = total + delivery;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const customer = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      address: String(formData.get("address") || "").trim(),
      city: String(formData.get("city") || "").trim(),
      pincode: String(formData.get("pincode") || "").trim(),
      note: String(formData.get("note") || "").trim(),
    };

    if (customer.name.length < 2) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(customer.phone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (customer.address.length < 5) {
      toast.error("Please enter a complete delivery address.");
      return;
    }

    if (customer.city.length < 2) {
      toast.error("Please enter your city.");
      return;
    }

    if (!/^\d{6}$/.test(customer.pincode)) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save the order to Supabase first.
      const order = await createOrder({
        data: {
          full_name: customer.name,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          pincode: customer.pincode,
          payment_method: "cod",
          items: items.map((item) => ({
            slug: item.slug,
            name: item.name,
            qty: item.qty,
          })),
        },
      });

      // Use server-calculated totals as the source of truth.
      const orderSubtotal = Number(order.subtotal);
      const orderDelivery = Number(order.delivery_fee);
      const orderTotal = Number(order.total);

      const itemsText = items
        .map((item) => {
          const lineTotal = item.qty * item.priceValue;
          return `• ${item.name} × ${item.qty} = ₹${lineTotal}`;
        })
        .join("\n");

      const message = `*NEW ORDER - JANTA TEA* ☕

*Order ID:* ${order.id}

*Customer Details*
Name: ${customer.name}
Mobile: ${customer.phone}

*Delivery Address*
${customer.address}
${customer.city} - ${customer.pincode}

*Order Items*
${itemsText}

*Order Summary*
Subtotal: ₹${orderSubtotal}
Delivery: ${orderDelivery === 0 ? "FREE" : `₹${orderDelivery}`}
*Total: ₹${orderTotal}*

*Payment Method:* Cash on Delivery
*Payment Status:* Pending
${customer.note ? `\n*Customer Note*\n${customer.note}\n` : ""}
Please confirm my order.`;

      const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;

      // Open WhatsApp after the order has been saved successfully.
      const whatsappWindow = window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer",
      );

      clear();

      if (whatsappWindow) {
        toast.success("Order saved! Please send the WhatsApp message to confirm.");
      } else {
        toast.success("Order saved successfully. Open WhatsApp to send your order.");
      }
    } catch (error) {
      console.error("Order creation error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to place your order. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearCart = () => {
    clear();
    toast.success("Your cart has been cleared.");
  };

  return (
    <div className="min-h-screen bg-cream text-chai">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <span className="label-eyebrow text-cardamom">
            WhatsApp order
          </span>

          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            Complete your order
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-chai/60">
            Enter your delivery details and send your order directly to
            Janta Tea Company on WhatsApp.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-border bg-card px-6 py-16 text-center shadow-sm sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream-deep font-display text-xl">
              JT
            </div>

            <h2 className="mt-6 font-display text-3xl">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-chai/55">
              Add some of your favourite teas before proceeding to checkout.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex rounded-full bg-chai px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:bg-terracotta"
            >
              Browse our teas
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
            <form onSubmit={handleSubmit} className="space-y-7">
              <section className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
                <div>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cardamom">
                    Step 01
                  </span>

                  <h2 className="mt-2 font-display text-2xl sm:text-3xl">
                    Delivery details
                  </h2>

                  <p className="mt-2 text-xs leading-6 text-chai/50">
                    Where should we deliver your order?
                  </p>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    name="name"
                    minLength={2}
                    maxLength={100}
                    placeholder="Full name"
                    autoComplete="name"
                    className="rounded-2xl border border-border bg-cream px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-chai/35 focus:border-terracotta"
                  />

                  <input
                    required
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    placeholder="Mobile number"
                    autoComplete="tel"
                    className="rounded-2xl border border-border bg-cream px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-chai/35 focus:border-terracotta"
                  />

                  <textarea
                    required
                    name="address"
                    minLength={5}
                    maxLength={400}
                    placeholder="Full delivery address"
                    rows={3}
                    autoComplete="street-address"
                    className="resize-none rounded-2xl border border-border bg-cream px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-chai/35 focus:border-terracotta sm:col-span-2"
                  />

                  <input
                    required
                    name="city"
                    minLength={2}
                    maxLength={80}
                    placeholder="City"
                    defaultValue="Indore"
                    autoComplete="address-level2"
                    className="rounded-2xl border border-border bg-cream px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-chai/35 focus:border-terracotta"
                  />

                  <input
                    required
                    name="pincode"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    placeholder="Pincode"
                    autoComplete="postal-code"
                    className="rounded-2xl border border-border bg-cream px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-chai/35 focus:border-terracotta"
                  />

                  <textarea
                    name="note"
                    maxLength={500}
                    placeholder="Any special note? (Optional)"
                    rows={2}
                    className="resize-none rounded-2xl border border-border bg-cream px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-chai/35 focus:border-terracotta sm:col-span-2"
                  />
                </div>
              </section>

              <section className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
                <div>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cardamom">
                    Step 02
                  </span>

                  <h2 className="mt-2 font-display text-2xl sm:text-3xl">
                    Confirm your order
                  </h2>

                  <p className="mt-2 text-xs leading-6 text-chai/50">
                    Your order will be saved and the details will open in
                    WhatsApp for confirmation.
                  </p>
                </div>

                <div className="mt-7 rounded-2xl bg-cream-deep p-5">
                  <p className="text-sm font-semibold">
                    📱 Order via WhatsApp
                  </p>

                  <p className="mt-2 text-xs leading-6 text-chai/55">
                    Online payment is not required. Pay when your order is
                    delivered.
                  </p>
                </div>
              </section>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-chai px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:bg-terracotta disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Placing order..."
                    : `Place COD order · ₹${grandTotal}`}
                </button>

                <button
                  type="button"
                  onClick={handleClearCart}
                  disabled={isSubmitting}
                  className="rounded-full border border-border px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-chai transition-colors hover:border-chai disabled:opacity-50"
                >
                  Clear cart
                </button>
              </div>

              <p className="text-center text-[10px] leading-5 text-chai/40">
                Your order is saved in our system before WhatsApp opens.
              </p>
            </form>

            <aside className="h-fit lg:sticky lg:top-24">
              <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-7">
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cardamom">
                  Your order
                </span>

                <h2 className="mt-2 font-display text-2xl sm:text-3xl">
                  Order summary
                </h2>

                <ul className="mt-7 space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.slug}
                      className="flex gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        loading="lazy"
                        decoding="async"
                        className="h-16 w-16 shrink-0 rounded-2xl bg-cream-deep object-contain p-1"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-chai/50">
                          Quantity: {item.qty}
                        </p>
                      </div>

                      <span className="shrink-0 text-sm font-semibold">
                        ₹{item.qty * item.priceValue}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 space-y-3 border-t border-border pt-5 text-sm">
                  <div className="flex justify-between text-chai/60">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>

                  <div className="flex justify-between text-chai/60">
                    <span>Delivery</span>
                    <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
                  </div>

                  <div className="flex items-end justify-between border-t border-border pt-4">
                    <span className="font-display text-xl">Total</span>
                    <span className="font-display text-2xl">
                      ₹{grandTotal}
                    </span>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-cream-deep p-4">
                  <p className="text-xs font-semibold">
                    Free delivery on orders of ₹500 or more
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-chai/50">
                    Orders below ₹500 have a ₹60 delivery charge.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}