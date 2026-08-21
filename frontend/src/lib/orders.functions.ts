import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const itemSchema = z.object({
  slug: z.string().trim().min(1).max(120),
  name: z.string().trim().min(1).max(200),
  qty: z.number().int().min(1).max(100),
});

const orderSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(20),
  address: z.string().trim().min(5).max(400),
  city: z.string().trim().min(2).max(80),
  pincode: z.string().trim().min(4).max(10),
  payment_method: z.enum([
    "upi",
    "card",
    "netbanking",
    "cod",
  ]),
  items: z.array(itemSchema).min(1).max(50),
});

export const createOrder = createServerFn({
  method: "POST",
})
  .middleware([requireSupabaseAuth])
  .validator((input) => orderSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    // -----------------------------------------
    // 1. Get products from database
    // -----------------------------------------

    const slugs = data.items.map(
      (item) => item.slug,
    );

    const uniqueSlugs = [
      ...new Set(slugs),
    ];

    const {
      data: products,
      error: productError,
    } = await supabase
      .from("products")
      .select(
        "slug, name, price_value, unit, image_url, category, in_stock",
      )
      .in("slug", uniqueSlugs);

    if (productError) {
      console.error(
        "Product lookup error:",
        productError,
      );

      throw new Error(
        `Unable to verify products: ${productError.message}`,
      );
    }

    // -----------------------------------------
    // 2. Convert products into lookup map
    // -----------------------------------------

    const productsBySlug = new Map(
      (products ?? []).map((product) => [
        product.slug,
        product,
      ]),
    );

    // -----------------------------------------
    // 3. Validate products + calculate prices
    // -----------------------------------------

    const lines = data.items.map((item) => {
      const product =
        productsBySlug.get(item.slug);

      if (!product) {
        throw new Error(
          `Product not found: ${item.slug}`,
        );
      }

      if (product.in_stock === false) {
        throw new Error(
          `${product.name} is currently out of stock.`,
        );
      }

      const unitPrice = Number(
        product.price_value,
      );

      if (
        !Number.isFinite(unitPrice) ||
        unitPrice < 0
      ) {
        throw new Error(
          `Invalid price for ${product.name}.`,
        );
      }

      return {
        product_slug: product.slug,
        name: product.name,
        image_url:
          product.image_url ?? null,
        unit_price: unitPrice,
        qty: item.qty,
      };
    });

    // -----------------------------------------
    // 4. Calculate totals on server
    // -----------------------------------------

    const subtotal = Number(
      lines
        .reduce(
          (sum, item) =>
            sum +
            item.unit_price *
              item.qty,
          0,
        )
        .toFixed(2),
    );

    const delivery_fee =
      subtotal >= 500 ? 0 : 60;

    const total = Number(
      (
        subtotal +
        delivery_fee
      ).toFixed(2),
    );

    // -----------------------------------------
    // 5. Create order
    // -----------------------------------------

    const {
      data: order,
      error: orderError,
    } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        full_name: data.full_name,
        phone: data.phone,
        address: data.address,
        city: data.city,
        pincode: data.pincode,
        subtotal,
        delivery_fee,
        total,
        payment_method:
          data.payment_method,
        payment_status: "pending",
        status: "placed",
      })
      .select(
        "id, total, delivery_fee, subtotal, payment_method, payment_status, status",
      )
      .single();

    if (orderError) {
      console.error(
        "Order creation error:",
        orderError,
      );

      throw new Error(
        `Unable to create your order: ${orderError.message}`,
      );
    }

    // -----------------------------------------
    // 6. Create order items
    // -----------------------------------------

    const orderItems =
      lines.map((item) => ({
        order_id: order.id,
        product_slug:
          item.product_slug,
        name: item.name,
        image_url:
          item.image_url,
        unit_price:
          item.unit_price,
        qty: item.qty,
      }));

    const {
      error: orderItemsError,
    } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (orderItemsError) {
      console.error(
        "Order items creation error:",
        orderItemsError,
      );

      throw new Error(
        `Order was created but order items could not be saved: ${orderItemsError.message}`,
      );
    }

    // -----------------------------------------
    // 7. Return created order
    // -----------------------------------------

    return order;
  });


// =============================================
// MY ORDERS
// =============================================

export const listMyOrders =
  createServerFn({
    method: "GET",
  })
    .middleware([
      requireSupabaseAuth,
    ])
    .handler(
      async ({ context }) => {
        const {
          data,
          error,
        } = await context.supabase
          .from("orders")
          .select(
            "*, order_items(*)",
          )
          .order(
            "created_at",
            {
              ascending: false,
            },
          );

        if (error) {
          console.error(
            "List orders error:",
            error,
          );

          throw new Error(
            `Unable to load your orders: ${error.message}`,
          );
        }

        return data ?? [];
      },
    );