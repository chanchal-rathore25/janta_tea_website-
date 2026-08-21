import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

if (!supabaseUrl || !serviceRoleKey || !razorpayKeySecret) {
  throw new Error("Payment verification service is not configured.");
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
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function createSignature(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    toBytes(razorpayKeySecret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  );

  return toHex(
    await crypto.subtle.sign(
      "HMAC",
      key,
      toBytes(payload),
    ),
  );
}

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) {
    return false;
  }

  let result = 0;

  for (let index = 0; index < left.length; index += 1) {
    result |=
      left.charCodeAt(index) ^
      right.charCodeAt(index);
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
    // AUTHENTICATE USER
    // ==========================================

    const authHeader =
      request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return Response.json(
        {
          error: "Authentication required.",
        },
        { status: 401 },
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
        { status: 401 },
      );
    }

    // ==========================================
    // READ PAYMENT DATA
    // ==========================================

    const body = await request.json();

    const orderId = body?.orderId;
    const razorpayOrderId =
      body?.razorpayOrderId;
    const razorpayPaymentId =
      body?.razorpayPaymentId;
    const razorpaySignature =
      body?.razorpaySignature;

    if (
      typeof orderId !== "string" ||
      typeof razorpayOrderId !== "string" ||
      typeof razorpayPaymentId !== "string" ||
      typeof razorpaySignature !== "string"
    ) {
      return Response.json(
        {
          error: "Invalid payment data.",
        },
        { status: 400 },
      );
    }

    // ==========================================
    // GET ORDER
    // ==========================================

    const { data: order, error: orderError } =
      await supabase
        .from("orders")
        .select(
          "id, user_id, total, payment_status, razorpay_order_id",
        )
        .eq("id", orderId)
        .eq("user_id", user.id)
        .single();

    if (orderError || !order) {
      return Response.json(
        {
          error: "Order not found.",
        },
        { status: 404 },
      );
    }

    // ==========================================
    // VERIFY RAZORPAY ORDER ID
    // ==========================================

    if (
      order.razorpay_order_id !==
      razorpayOrderId
    ) {
      return Response.json(
        {
          error: "Payment order mismatch.",
        },
        { status: 400 },
      );
    }

    // ==========================================
    // ALREADY PAID
    // ==========================================

    if (order.payment_status === "paid") {
      return Response.json({
        success: true,
        message: "Payment already verified.",
      });
    }

    // ==========================================
    // VERIFY RAZORPAY SIGNATURE
    // ==========================================

    const signaturePayload =
      `${razorpayOrderId}|${razorpayPaymentId}`;

    const expectedSignature =
      await createSignature(
        signaturePayload,
      );

    if (
      !safeEqual(
        razorpaySignature,
        expectedSignature,
      )
    ) {
      return Response.json(
        {
          error: "Invalid payment signature.",
        },
        { status: 400 },
      );
    }

    // ==========================================
    // MARK ORDER AS PAID
    // ==========================================

    const { error: updateError } =
      await supabase
        .from("orders")
        .update({
          razorpay_payment_id:
            razorpayPaymentId,
          payment_status: "paid",
          status: "confirmed",
        })
        .eq("id", order.id)
        .eq("user_id", user.id);

    if (updateError) {
      console.error(
        "Payment status update failed:",
        updateError,
      );

      return Response.json(
        {
          error:
            "Payment was verified but order could not be updated.",
        },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      message: "Payment verified successfully.",
      orderId: order.id,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    console.error(
      "Payment verification error:",
      error,
    );

    return Response.json(
      {
        error: "Something went wrong.",
      },
      { status: 500 },
    );
  }
});