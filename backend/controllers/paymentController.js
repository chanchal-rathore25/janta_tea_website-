import crypto from "crypto";

import razorpay from "../utils/razorpay.js";
import Order from "../models/Order.js";

// =====================================================
// CREATE RAZORPAY ORDER
// =====================================================

export const createRazorpayOrder = async (
  req,
  res,
  next
) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required.",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (order.paymentMethod !== "online") {
      return res.status(400).json({
        success: false,
        message: "This order is not an online payment order.",
      });
    }

    if (order.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Order is already paid.",
      });
    }

    // Razorpay expects amount in paise
    const amountInPaise = Math.round(order.total * 100);

    const razorpayOrder =
      await razorpay.orders.create({
        amount: amountInPaise,

        currency: "INR",

        receipt: `tea_${order._id}`,

        notes: {
          internalOrderId: order._id.toString(),
        },

        payment_capture: 1,
      });

    order.razorpayOrderId = razorpayOrder.id;

    await order.save();

    res.status(201).json({
      success: true,

      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },

      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// VERIFY PAYMENT
// =====================================================

export const verifyPayment = async (
  req,
  res,
  next
) => {
  try {
    const {
      orderId,
      razorpayPaymentId,
      razorpaySignature,
    } = req.body;

    if (
      !orderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification data is incomplete.",
      });
    }

    // IMPORTANT:
    // Get Razorpay order ID from OUR DATABASE.
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (!order.razorpayOrderId) {
      return res.status(400).json({
        success: false,
        message: "Razorpay order does not exist.",
      });
    }

    // Prevent duplicate payment processing
    if (order.paymentStatus === "paid") {
      return res.status(200).json({
        success: true,
        message: "Payment already verified.",
      });
    }

    // -----------------------------------------
    // Generate expected signature
    // -----------------------------------------

    const body =
      `${order.razorpayOrderId}|${razorpayPaymentId}`;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(body)
        .digest("hex");

    // -----------------------------------------
    // Timing-safe comparison
    // -----------------------------------------

    const expectedBuffer =
      Buffer.from(expectedSignature);

    const receivedBuffer =
      Buffer.from(razorpaySignature);

    if (
      expectedBuffer.length !==
      receivedBuffer.length
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed.",
      });
    }

    const isValid =
      crypto.timingSafeEqual(
        expectedBuffer,
        receivedBuffer
      );

    if (!isValid) {
      order.paymentStatus = "failed";

      await order.save();

      return res.status(400).json({
        success: false,
        message: "Payment verification failed.",
      });
    }

    // -----------------------------------------
    // Payment verified
    // -----------------------------------------

    order.razorpayPaymentId =
      razorpayPaymentId;

    order.razorpaySignature =
      razorpaySignature;

    order.paymentStatus = "paid";

    order.orderStatus = "confirmed";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully.",

      order: {
        id: order._id,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};