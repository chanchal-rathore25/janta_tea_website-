import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

if (
  !supabaseUrl ||
  !serviceRoleKey ||
  !razorpayKeyId ||
  !razorpayKeySecret
) {
  throw new Error(
    "Razorpay payment service is not configured.",
  );
}

const supabase = createClient(
  supabaseUrl,
  serviceRoleKey,
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods":
    "POST, OPTIONS",
};

// =====================================================
// CREATE RAZORPAY AUTH HEADER
// =====================================================

function createRazorpayAuthHeader() {
  const credentials =
    `${razorpayKeyId}:${razorpayKeySecret}`;

  const encoded =
    btoa(credentials);

  return `Basic ${encoded}`;
}

// =====================================================
// EDGE FUNCTION
// =====================================================

Deno.serve(async (request) => {
  // ===================================================
  // CORS
  // ===================================================

  if (request.method === "OPTIONS") {
    return new Response(
      "ok",
      {
        headers: corsHeaders,
      },
    );
  }

  if (request.method !== "POST") {
    return Response.json(
      {
        error: "Method not allowed.",
      },
      {
        status: 405,
        headers: corsHeaders,
      },
    );
  }

  try {
    // =================================================
    // 1. AUTHENTICATE USER
    // =================================================

    const authHeader =
      request.headers.get("Authorization");

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return Response.json(
        {
          error: "Authentication required.",
        },
        {
          status: 401,
          headers: corsHeaders,
        },
      );
    }

    const accessToken =
      authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(
      accessToken,
    );

    if (userError || !user) {
      return Response.json(
        {
          error: "Invalid authentication.",
        },
        {
          status: 401,
          headers: corsHeaders,
        },
      );
    }

    // =================================================
    // 2. READ REQUEST BODY
    // =================================================

    const body = await request.json();

    const orderId = body?.orderId;

    if (
      typeof orderId !== "string" ||
      orderId.trim().length === 0
    ) {
      return Response.json(
        {
          error: "Order ID is required.",
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    // =================================================
    // 3. GET ORDER FROM DATABASE
    // =================================================
    //
    // IMPORTANT:
    // We DO NOT trust amount from frontend.
    // The amount comes from our Supabase order.
    //

    const {
      data: order,
      error: orderError,
    } = await supabase
      .from("orders")
      .select(
        `
          id,
          user_id,
          total,
          payment_status,
          status,
          razorpay_order_id,
          razorpay_payment_id
        `,
      )
      .eq("id", orderId)
      .eq("user_id", user.id)
      .single();

    if (orderError || !order) {
      console.error(
        "Order lookup failed:",
        orderError,
      );

      return Response.json(
        {
          error: "Order not found.",
        },
        {
          status: 404,
          headers: corsHeaders,
        },
      );
    }

    // =================================================
    // 4. CHECK ORDER STATUS
    // =================================================

    if (
      order.payment_status === "paid"
    ) {
      return Response.json(
        {
          error: "This order has already been paid.",
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    // =================================================
    // 5. REUSE EXISTING RAZORPAY ORDER
    // =================================================
    //
    // Prevent creating multiple Razorpay orders
    // if the user retries payment.
    //

    if (order.razorpay_order_id) {
      const amountInPaise =
        Math.round(
          Number(order.total) * 100,
        );

      if (
        !Number.isFinite(amountInPaise) ||
        amountInPaise <= 0
      ) {
        return Response.json(
          {
            error:
              "Invalid order amount.",
          },
          {
            status: 400,
            headers: corsHeaders,
          },
        );
      }

      return Response.json(
        {
          success: true,
          razorpayOrderId:
            order.razorpay_order_id,
          amount: amountInPaise,
          currency: "INR",
          keyId: razorpayKeyId,
        },
        {
          status: 200,
          headers: corsHeaders,
        },
      );
    }

    // =================================================
    // 6. VALIDATE ORDER TOTAL
    // =================================================

    const total =
      Number(order.total);

    if (
      !Number.isFinite(total) ||
      total <= 0
    ) {
      return Response.json(
        {
          error:
            "Invalid order amount.",
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    // Razorpay requires amount in paise.
    const amountInPaise =
      Math.round(total * 100);

    if (amountInPaise <= 0) {
      return Response.json(
        {
          error:
            "Order amount must be greater than zero.",
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    // =================================================
    // 7. CREATE RAZORPAY ORDER
    // =================================================

    const razorpayResponse =
      await fetch(
        "https://api.razorpay.com/v1/orders",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              createRazorpayAuthHeader(),
          },

          body: JSON.stringify({
            amount:
              amountInPaise,

            currency: "INR",

            receipt:
              `janta_${order.id}`,

            notes: {
              supabase_order_id:
                order.id,

              user_id:
                user.id,
            },
          }),
        },
      );

    // =================================================
    // 8. HANDLE RAZORPAY ERROR
    // =================================================

    if (!razorpayResponse.ok) {
      const razorpayError =
        await razorpayResponse.text();

      console.error(
        "Razorpay API error:",
        razorpayError,
      );

      return Response.json(
        {
          error:
            "Unable to create Razorpay order.",
        },
        {
          status: 502,
          headers: corsHeaders,
        },
      );
    }

    const razorpayOrder =
      await razorpayResponse.json();

    // =================================================
    // 9. VALIDATE RAZORPAY RESPONSE
    // =================================================

    if (
      typeof razorpayOrder?.id !==
      "string"
    ) {
      console.error(
        "Invalid Razorpay response:",
        razorpayOrder,
      );

      return Response.json(
        {
          error:
            "Invalid response from Razorpay.",
        },
        {
          status: 502,
          headers: corsHeaders,
        },
      );
    }

    // =================================================
    // 10. SAVE RAZORPAY ORDER ID
    // =================================================

    const {
      error: updateError,
    } = await supabase
      .from("orders")
      .update({
        razorpay_order_id:
          razorpayOrder.id,
      })
      .eq("id", order.id)
      .eq("user_id", user.id);

    if (updateError) {
      console.error(
        "Failed to save Razorpay order ID:",
        updateError,
      );

      return Response.json(
        {
          error:
            "Razorpay order was created but could not be linked to your order.",
        },
        {
          status: 500,
          headers: corsHeaders,
        },
      );
    }

    // =================================================
    // 11. RETURN DATA TO FRONTEND
    // =================================================

    return Response.json(
      {
        success: true,

        razorpayOrderId:
          razorpayOrder.id,

        amount:
          amountInPaise,

        currency: "INR",

        keyId:
          razorpayKeyId,
      },
      {
        status: 200,
        headers: corsHeaders,
      },
    );
  } catch (error) {
    console.error(
      "Razorpay create order error:",
      error,
    );

    return Response.json(
      {
        error:
          "Something went wrong while creating the payment order.",
      },
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
});