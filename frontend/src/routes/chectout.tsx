import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { createOrder } from "@/lib/orders.functions";
import { supabase } from "@/integrations/supabase/client";

const title = "Checkout — Janta Tea Company, Indore";

const description =
  "Complete your order from Janta Tea Company. Secure payment and delivery across Indore.";

type PaymentMethod = "online" | "cod";

export const Route = createFileRoute("/chectout")({
  head: () => ({
    meta: [
      { title },
      {
        name: "description",
        content: description,
      },
      {
        property: "og:title",
        content: title,
      },
      {
        property: "og:description",
        content: description,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),

  component: Checkout,
});

function Checkout() {
  const { items, total, clear } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("online");

  const delivery =
    total >= 500 || total === 0
      ? 0
      : 60;

  const grandTotal = total + delivery;

  // =====================================================
  // OPEN RAZORPAY CHECKOUT
  // =====================================================

 const openRazorpayCheckout = async (
  orderId: string,
) => {
  try {
    // =================================================
    // 1. CREATE RAZORPAY ORDER
    // =================================================

    console.log(
      "Creating Razorpay order for:",
      orderId,
    );

    const {
      data: razorpayOrder,
      error: razorpayOrderError,
    } = await supabase.functions.invoke(
      "razorpay-create-order",
      {
        body: {
          orderId,
        },
      },
    );

    // -------------------------------------------------
    // Edge Function Error
    // -------------------------------------------------

  if (razorpayOrderError) {
  console.error(
    "Razorpay order error:",
    razorpayOrderError,
  );

  try {
    const errorBody =
      await razorpayOrderError.context?.json?.();

    console.error(
      "Razorpay Edge Function error body:",
      errorBody,
    );
  } catch {
    console.error(
      "Could not read Edge Function error body.",
    );
  }

  throw new Error(
    `Unable to start online payment: ${razorpayOrderError.message}`,
  );
}
    // -------------------------------------------------
    // Debug response
    // -------------------------------------------------

    console.log(
      "Razorpay order response:",
      razorpayOrder,
    );

    // -------------------------------------------------
    // Validate response
    // -------------------------------------------------

    if (!razorpayOrder) {
      throw new Error(
        "Razorpay returned an empty response.",
      );
    }

    if (
      !razorpayOrder.razorpayOrderId ||
      !razorpayOrder.amount ||
      !razorpayOrder.keyId
    ) {
      console.error(
        "Invalid Razorpay response:",
        razorpayOrder,
      );

      throw new Error(
        `Invalid payment order response: ${JSON.stringify(
          razorpayOrder,
        )}`,
      );
    }

    // =================================================
    // 2. CHECK RAZORPAY SCRIPT
    // =================================================

    if (
      typeof window.Razorpay !==
      "function"
    ) {
      throw new Error(
        "Razorpay checkout is not available. Please refresh the page and try again.",
      );
    }

    // =================================================
    // 3. RAZORPAY OPTIONS
    // =================================================

    const options: RazorpayOptions = {
      key: razorpayOrder.keyId,

      amount: Number(
        razorpayOrder.amount,
      ),

      currency:
        razorpayOrder.currency ||
        "INR",

      name: "Janta Tea Company",

      description:
        "Tea order from Janta Tea Company",

      order_id:
        razorpayOrder.razorpayOrderId,

      prefill: {
        name:
          (
            document.querySelector(
              'input[name="name"]',
            ) as HTMLInputElement
          )?.value || "",

        contact:
          (
            document.querySelector(
              'input[name="phone"]',
            ) as HTMLInputElement
          )?.value || "",
      },

      theme: {
        color: "#8B4513",
      },

      // =================================================
      // 4. PAYMENT SUCCESS
      // =================================================

      handler: async (
        response: RazorpayResponse,
      ) => {
        try {
          console.log(
            "Razorpay payment response:",
            response,
          );

          toast.loading(
            "Verifying your payment...",
            {
              id: "payment-verification",
            },
          );

          // ---------------------------------------------
          // VERIFY PAYMENT
          // ---------------------------------------------

          const {
            data: verificationResult,
            error: verificationError,
          } =
            await supabase.functions.invoke(
              "razorpay-verify-payment",
              {
                body: {
                  orderId,

                  razorpayOrderId:
                    response.razorpay_order_id,

                  razorpayPaymentId:
                    response.razorpay_payment_id,

                  razorpaySignature:
                    response.razorpay_signature,
                },
              },
            );

          // ---------------------------------------------
          // Verification error
          // ---------------------------------------------

          if (verificationError) {
            console.error(
              "Payment verification error:",
              verificationError,
            );

            throw new Error(
              `Payment verification failed: ${verificationError.message}`,
            );
          }

          // ---------------------------------------------
          // Verification response
          // ---------------------------------------------

          console.log(
            "Payment verification response:",
            verificationResult,
          );

          if (
            !verificationResult?.success
          ) {
            throw new Error(
              "Payment could not be verified.",
            );
          }

          // =============================================
          // PAYMENT SUCCESS
          // =============================================

          clear();

          toast.success(
            "Payment successful! Your order has been confirmed.",
            {
              id: "payment-verification",
            },
          );
        } catch (error) {
          console.error(
            "Payment verification failed:",
            error,
          );

          toast.error(
            error instanceof Error
              ? error.message
              : "Payment verification failed.",
            {
              id: "payment-verification",
            },
          );
        } finally {
          setIsSubmitting(false);
        }
      },

      // =================================================
      // 5. PAYMENT MODAL DISMISSED
      // =================================================

      modal: {
        ondismiss: () => {
          console.log(
            "Razorpay payment modal closed.",
          );

          setIsSubmitting(false);

          toast.info(
            "Payment was cancelled. Your cart is still saved.",
          );
        },
      },
    };

    // =================================================
    // 6. CREATE RAZORPAY INSTANCE
    // =================================================

    const razorpay =
      new window.Razorpay(options);

    // =================================================
    // 7. PAYMENT FAILED
    // =================================================

    razorpay.on(
      "payment.failed",
      (response) => {
        console.error(
          "Razorpay payment failed:",
          response,
        );

        setIsSubmitting(false);

        toast.error(
          response.error?.description ||
            "Payment failed. Please try again.",
        );
      },
    );

    // =================================================
    // 8. OPEN RAZORPAY
    // =================================================

    console.log(
      "Opening Razorpay checkout...",
    );

    razorpay.open();
  } catch (error) {
    console.error(
      "Razorpay checkout error:",
      error,
    );

    setIsSubmitting(false);

    toast.error(
      error instanceof Error
        ? error.message
        : "Unable to start payment.",
    );
  }
};

  // =====================================================
  // HANDLE CHECKOUT
  // =====================================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error(
        "Your cart is empty.",
      );

      return;
    }

    setIsSubmitting(true);

    try {
      // -------------------------------------------------
      // GET FORM DATA
      // -------------------------------------------------

      const formData =
        new FormData(e.currentTarget);

      const customer = {
        name: String(
          formData.get("name") || "",
        ).trim(),

        phone: String(
          formData.get("phone") || "",
        ).trim(),

        address: String(
          formData.get("address") || "",
        ).trim(),

        city: String(
          formData.get("city") || "",
        ).trim(),

        pincode: String(
          formData.get("pincode") || "",
        ).trim(),
      };

      // -------------------------------------------------
      // VALIDATE NAME
      // -------------------------------------------------

      if (customer.name.length < 2) {
        toast.error(
          "Please enter your full name.",
        );

        setIsSubmitting(false);
        return;
      }

      // -------------------------------------------------
      // VALIDATE PHONE
      // -------------------------------------------------

      if (
        !/^[6-9]\d{9}$/.test(
          customer.phone,
        )
      ) {
        toast.error(
          "Please enter a valid 10-digit mobile number.",
        );

        setIsSubmitting(false);
        return;
      }

      // -------------------------------------------------
      // VALIDATE ADDRESS
      // -------------------------------------------------

      if (customer.address.length < 5) {
        toast.error(
          "Please enter a complete delivery address.",
        );

        setIsSubmitting(false);
        return;
      }

      // -------------------------------------------------
      // VALIDATE CITY
      // -------------------------------------------------

      if (customer.city.length < 2) {
        toast.error(
          "Please enter your city.",
        );

        setIsSubmitting(false);
        return;
      }

      // -------------------------------------------------
      // VALIDATE PINCODE
      // -------------------------------------------------

      if (
        !/^\d{6}$/.test(
          customer.pincode,
        )
      ) {
        toast.error(
          "Please enter a valid 6-digit pincode.",
        );

        setIsSubmitting(false);
        return;
      }

      // -------------------------------------------------
      // VALIDATE PRODUCT SLUGS
      // -------------------------------------------------

      const invalidProduct =
        items.find(
          (item) => !item.slug,
        );

      if (invalidProduct) {
        toast.error(
          `Product information is missing for ${invalidProduct.name}. Please remove it and add it again.`,
        );

        setIsSubmitting(false);
        return;
      }

      // =================================================
      // CREATE SUPABASE ORDER
      // =================================================

      const order =
        await createOrder({
          data: {
            full_name:
              customer.name,

            phone:
              customer.phone,

            address:
              customer.address,

            city:
              customer.city,

            pincode:
              customer.pincode,

            payment_method:
              paymentMethod === "cod"
                ? "cod"
                : "upi",

            items: items.map(
              (item) => ({
                slug:
                  item.slug,

                name:
                  item.name,

                qty:
                  item.qty,
              }),
            ),
          },
        });

      // =================================================
      // COD
      // =================================================

      if (
        paymentMethod === "cod"
      ) {
        clear();

        toast.success(
          "Your order has been placed successfully!",
        );

        return;
      }

      // =================================================
      // ONLINE PAYMENT
      // =================================================

      await openRazorpayCheckout(
        order.id,
      );
    } catch (error) {
      console.error(
        "Checkout error:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );

      setIsSubmitting(false);
    }
  };

  // =====================================================
  // CLEAR CART
  // =====================================================

  const handleClearCart = () => {
    clear();

    toast.success(
      "Your cart has been cleared.",
    );
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-cream text-chai">

      <Navbar />

      <main className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8 lg:px-12">

        {/* HEADER */}

        <div className="max-w-3xl">

          <span className="label-eyebrow text-cardamom">
            Secure checkout
          </span>

          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            Complete your order
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-chai/60">
            Enter your delivery details and review
            your order before completing payment.
          </p>

        </div>

        {/* EMPTY CART */}

        {items.length === 0 ? (

          <div className="mt-10 rounded-[2rem] border border-border bg-card px-6 py-16 text-center shadow-sm sm:px-10">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream-deep font-display text-xl">
              JT
            </div>

            <h2 className="mt-6 font-display text-3xl">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-chai/55">
              Add some of your favourite teas before
              proceeding to checkout.
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

            {/* LEFT */}

            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >

              {/* DELIVERY DETAILS */}

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
                    placeholder="Full name"
                    autoComplete="name"
                    className="rounded-2xl border border-border bg-cream px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-chai/35 focus:border-terracotta"
                  />

                  <input
                    required
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="Mobile number"
                    autoComplete="tel"
                    className="rounded-2xl border border-border bg-cream px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-chai/35 focus:border-terracotta"
                  />

                  <textarea
                    required
                    name="address"
                    placeholder="Full delivery address"
                    rows={3}
                    autoComplete="street-address"
                    className="resize-none rounded-2xl border border-border bg-cream px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-chai/35 focus:border-terracotta sm:col-span-2"
                  />

                  <input
                    required
                    name="city"
                    placeholder="City"
                    defaultValue="Indore"
                    autoComplete="address-level2"
                    className="rounded-2xl border border-border bg-cream px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-chai/35 focus:border-terracotta"
                  />

                  <input
                    required
                    name="pincode"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Pincode"
                    autoComplete="postal-code"
                    className="rounded-2xl border border-border bg-cream px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-chai/35 focus:border-terracotta"
                  />

                </div>

              </section>

              {/* PAYMENT */}

              <section className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">

                <div>

                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cardamom">
                    Step 02
                  </span>

                  <h2 className="mt-2 font-display text-2xl sm:text-3xl">
                    Payment
                  </h2>

                  <p className="mt-2 text-xs leading-6 text-chai/50">
                    Choose your preferred payment method.
                  </p>

                </div>

                {/* ONLINE PAYMENT */}

                <label
                  className={`mt-7 flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-colors ${
                    paymentMethod === "online"
                      ? "border-terracotta bg-cream"
                      : "border-border hover:border-chai/30"
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={
                      paymentMethod ===
                      "online"
                    }
                    onChange={() =>
                      setPaymentMethod(
                        "online",
                      )
                    }
                    className="mt-1 accent-terracotta"
                  />

                  <span>

                    <span className="block text-sm font-semibold">
                      Secure online payment
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-chai/50">
                      Pay securely using UPI,
                      debit card, credit card
                      or net banking through
                      Razorpay.
                    </span>

                  </span>

                </label>

                {/* COD */}

                <label
                  className={`mt-4 flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-colors ${
                    paymentMethod === "cod"
                      ? "border-terracotta bg-cream"
                      : "border-border hover:border-chai/30"
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={
                      paymentMethod ===
                      "cod"
                    }
                    onChange={() =>
                      setPaymentMethod(
                        "cod",
                      )
                    }
                    className="mt-1 accent-terracotta"
                  />

                  <span>

                    <span className="block text-sm font-semibold">
                      Cash on delivery
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-chai/50">
                      Available for eligible
                      Indore deliveries.
                    </span>

                  </span>

                </label>

              </section>

              {/* ACTIONS */}

              <div className="flex flex-col gap-3 sm:flex-row">

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-chai px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:bg-terracotta disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Processing..."
                    : paymentMethod ===
                        "cod"
                      ? `Place order · ₹${grandTotal}`
                      : `Continue to payment · ₹${grandTotal}`}
                </button>

                <button
                  type="button"
                  onClick={
                    handleClearCart
                  }
                  disabled={
                    isSubmitting
                  }
                  className="rounded-full border border-border px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-chai transition-colors hover:border-chai disabled:opacity-50"
                >
                  Clear cart
                </button>

              </div>

              <p className="text-center text-[10px] leading-5 text-chai/40">
                Your payment will be processed securely.
                We never store your card details.
              </p>

            </form>

            {/* ORDER SUMMARY */}

            <aside className="h-fit lg:sticky lg:top-24">

              <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-7">

                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cardamom">
                  Your order
                </span>

                <h2 className="mt-2 font-display text-2xl sm:text-3xl">
                  Order summary
                </h2>

                {/* ITEMS */}

                <ul className="mt-7 space-y-4">

                  {items.map((item) => (

                    <li
                      key={item.name}
                      className="flex gap-3"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 shrink-0 rounded-2xl bg-cream-deep object-contain p-1"
                      />

                      <div className="min-w-0 flex-1">

                        <p className="truncate text-sm font-semibold">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-chai/50">
                          Quantity:{" "}
                          {item.qty}
                        </p>

                      </div>

                      <span className="shrink-0 text-sm font-semibold">
                        ₹
                        {item.qty *
                          item.priceValue}
                      </span>

                    </li>

                  ))}

                </ul>

                {/* TOTAL */}

                <div className="mt-7 space-y-3 border-t border-border pt-5 text-sm">

                  <div className="flex justify-between text-chai/60">

                    <span>
                      Subtotal
                    </span>

                    <span>
                      ₹{total}
                    </span>

                  </div>

                  <div className="flex justify-between text-chai/60">

                    <span>
                      Delivery
                    </span>

                    <span>
                      {delivery === 0
                        ? "Free"
                        : `₹${delivery}`}
                    </span>

                  </div>

                  <div className="flex items-end justify-between border-t border-border pt-4">

                    <span className="font-display text-xl">
                      Total
                    </span>

                    <span className="font-display text-2xl">
                      ₹
                      {grandTotal}
                    </span>

                  </div>

                </div>

                {/* DELIVERY NOTE */}

                <div className="mt-6 rounded-2xl bg-cream-deep p-4">

                  <p className="text-xs font-semibold">
                    Free delivery on orders above ₹500
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-chai/50">
                    Delivery charges may apply to
                    smaller orders within eligible
                    areas.
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