// <reference types="https://deno.land/x/deno/cli/types/deno.d.ts" />

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const webhookSecret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET");

if (!supabaseUrl || !serviceRoleKey || !webhookSecret) {
  throw new Error("Webhook service is not configured.");
}

const supabase = createClient(
  supabaseUrl,
  serviceRoleKey,
);

function toBytes(value: string) {
  return new TextEncoder().encode(value);
}

function toHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)]
    .map((byte) =>
      byte.toString(16).padStart(2, "0"),
    )
    .join("");
}

async function createHmacSignature(
  payload: string,
) {
  const key = await crypto.subtle.importKey(
    "raw",
    toBytes(webhookSecret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    toBytes(payload),
  );

  return toHex(signature);
}

function safeEqual(
  left: string,
  right: string,
) {
  if (left.length !== right.length) {
    return false;
  }

  let result = 0;

  for (let i = 0; i < left.length; i += 1) {
    result |=
      left.charCodeAt(i) ^
      right.charCodeAt(i);
  }

  return result === 0;
}

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return new Response(
      "Method not allowed",
      { status: 405 },
    );
  }

  try {
    // ==========================================
    // READ RAW BODY
    // ==========================================

    const rawBody = await request.text();

    if (!rawBody) {
      return Response.json(
        {
          error: "Empty request body.",
        },
        { status: 400 },
      );
    }

    // ==========================================
    // VERIFY RAZORPAY WEBHOOK SIGNATURE
    // ==========================================

    const razorpaySignature =
      request.headers.get(
        "x-razorpay-signature",
      );

    if (!razorpaySignature) {
      return Response.json(
        {
          error:
            "Missing Razorpay webhook signature.",
        },
        { status: 401 },
      );
    }

    const expectedSignature =
      await createHmacSignature(
        rawBody,
      );

    if (
      !safeEqual(
        razorpaySignature,
        expectedSignature,
      )
    ) {
      console.error(
        "Invalid Razorpay webhook signature.",
      );

      return Response.json(
        {
          error:
            "Invalid webhook signature.",
        },
        { status: 401 },
      );
    }

    // ==========================================
    // PARSE WEBHOOK BODY
    // ==========================================

    const payload =
      JSON.parse(rawBody);

    const event = payload?.event;

    if (typeof event !== "string") {
      return Response.json(
        {
          error: "Invalid webhook event.",
        },
        { status: 400 },
      );
    }

    // ==========================================
    // GET EVENT ID
    // ==========================================

    const eventId =
      request.headers.get(
        "x-razorpay-event-id",
      );

    if (!eventId) {
      return Response.json(
        {
          error:
            "Missing Razorpay event ID.",
        },
        { status: 400 },
      );
    }

    // ==========================================
    // DUPLICATE EVENT PROTECTION
    // ==========================================

    const { data: existingEvent } =
      await supabase
        .from("razorpay_webhook_events")
        .select("id")
        .eq("id", eventId)
        .maybeSingle();

    if (existingEvent) {
      return Response.json({
        success: true,
        message: "Event already processed.",
      });
    }

    // ==========================================
    // SAVE EVENT
    // ==========================================

    const { error: eventInsertError } =
      await supabase
        .from("razorpay_webhook_events")
        .insert({
          id: eventId,
          event,
        });

    if (eventInsertError) {
      console.error(
        "Webhook event insert error:",
        eventInsertError,
      );

      return Response.json(
        {
          error:
            "Unable to record webhook event.",
        },
        { status: 500 },
      );
    }

    // ==========================================
    // PAYMENT CAPTURED
    // ==========================================

    if (
      event ===
      "payment.captured"
    ) {
      const payment =
        payload?.payload?.payment?.entity;

      const razorpayPaymentId =
        payment?.id;

      const razorpayOrderId =
        payment?.order_id;

      if (
        typeof razorpayPaymentId !==
          "string" ||
        typeof razorpayOrderId !==
          "string"
      ) {
        console.error(
          "Invalid payment.captured payload.",
        );

        return Response.json(
          {
            error:
              "Invalid payment payload.",
          },
          { status: 400 },
        );
      }

      // ------------------------------------------
      // FIND ORDER
      // ------------------------------------------

      const { data: order, error: orderError } =
        await supabase
          .from("orders")
          .select(
            "id, payment_status, status",
          )
          .eq(
            "razorpay_order_id",
            razorpayOrderId,
          )
          .maybeSingle();

      if (orderError) {
        console.error(
          "Order lookup error:",
          orderError,
        );

        return Response.json(
          {
            error:
              "Unable to find order.",
          },
          { status: 500 },
        );
      }

      if (!order) {
        console.error(
          "Order not found for Razorpay order:",
          razorpayOrderId,
        );

        return Response.json(
          {
            success: true,
            message:
              "Order not found. Event recorded.",
          },
        );
      }

      // ------------------------------------------
      // MARK PAYMENT AS PAID
      // ------------------------------------------

      if (
        order.payment_status !==
        "paid"
      ) {
        const { error: updateError } =
          await supabase
            .from("orders")
            .update({
              razorpay_payment_id:
                razorpayPaymentId,
              payment_status:
                "paid",
              status:
                "confirmed",
            })
            .eq("id", order.id);

        if (updateError) {
          console.error(
            "Order payment update error:",
            updateError,
          );

          return Response.json(
            {
              error:
                "Unable to update order.",
            },
            { status: 500 },
          );
        }
      }
    }

    // ==========================================
    // PAYMENT FAILED
    // ==========================================

    if (
      event ===
      "payment.failed"
    ) {
      const payment =
        payload?.payload?.payment?.entity;

      const razorpayOrderId =
        payment?.order_id;

      if (
        typeof razorpayOrderId ===
        "string"
      ) {
        const { error: updateError } =
          await supabase
            .from("orders")
            .update({
              payment_status:
                "failed",
            })
            .eq(
              "razorpay_order_id",
              razorpayOrderId,
            )
            .neq(
              "payment_status",
              "paid",
            );

        if (updateError) {
          console.error(
            "Payment failure update error:",
            updateError,
          );

          return Response.json(
            {
              error:
                "Unable to update failed payment.",
            },
            { status: 500 },
          );
        }
      }
    }

    // ==========================================
    // PAYMENT REFUNDED
    // ==========================================

    if (
      event ===
      "refund.created"
    ) {
      const payment =
        payload?.payload?.refund?.entity;

      const razorpayPaymentId =
        payment?.payment_id;

      if (
        typeof razorpayPaymentId ===
        "string"
      ) {
        const { error: updateError } =
          await supabase
            .from("orders")
            .update({
              payment_status:
                "refunded",
            })
            .eq(
              "razorpay_payment_id",
              razorpayPaymentId,
            );

        if (updateError) {
          console.error(
            "Refund update error:",
            updateError,
          );

          return Response.json(
            {
              error:
                "Unable to update refund.",
            },
            { status: 500 },
          );
        }
      }
    }

    // ==========================================
    // SUCCESS
    // ==========================================

    return Response.json({
      success: true,
      event,
    });
  } catch (error) {
    console.error(
      "Razorpay webhook error:",
      error,
    );

    return Response.json(
      {
        error:
          "Something went wrong.",
      },
      { status: 500 },
    );
  }
});