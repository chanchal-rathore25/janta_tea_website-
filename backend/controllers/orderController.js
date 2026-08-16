import Order from "../models/Order.js";

const calculateDelivery = (subtotal) => {
  if (subtotal >= 500) {
    return 0;
  }

  return 60;
};

export const createOrder = async (req, res, next) => {
  try {
    const {
      customer,
      items,
      paymentMethod,
    } = req.body;

    // -----------------------------
    // Basic validation
    // -----------------------------

    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "Customer details are required.",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    if (!["online", "cod"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method.",
      });
    }

    // -----------------------------
    // Validate customer
    // -----------------------------

    const {
      name,
      phone,
      address,
      city,
      pincode,
    } = customer;

    if (
      !name ||
      !phone ||
      !address ||
      !city ||
      !pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete delivery details.",
      });
    }

    // -----------------------------
    // Validate items
    // -----------------------------

    let subtotal = 0;

    const cleanedItems = items.map((item) => {
      if (
        !item.productId ||
        !item.name ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        throw new Error("Invalid product information.");
      }

      if (
        typeof item.price !== "number" ||
        item.price < 0
      ) {
        throw new Error("Invalid product price.");
      }

      const itemTotal = item.price * item.quantity;

      subtotal += itemTotal;

      return {
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image || "",
      };
    });

    subtotal = Number(subtotal.toFixed(2));

    const deliveryCharge = calculateDelivery(subtotal);

    const total = Number(
      (subtotal + deliveryCharge).toFixed(2)
    );

    // -----------------------------
    // Create local order
    // -----------------------------

    const order = await Order.create({
      customer: {
        name,
        phone,
        address,
        city,
        pincode,
      },

      items: cleanedItems,

      subtotal,
      deliveryCharge,
      total,

      paymentMethod,

      paymentStatus:
        paymentMethod === "cod"
          ? "pending"
          : "pending",
    });

    res.status(201).json({
      success: true,

      message: "Order created successfully.",

      order: {
        id: order._id,
        total: order.total,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};