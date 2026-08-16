import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";

import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

import {
  generalLimiter,
} from "./middleware/rateLimiters.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";


// =====================================================
// ENVIRONMENT CHECK
// =====================================================

const requiredEnv = [
  "MONGO_URI",
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
];

for (const variable of requiredEnv) {
  if (!process.env[variable]) {
    console.error(
      `❌ Missing environment variable: ${variable}`
    );

    process.exit(1);
  }
}

// =====================================================
// APP
// =====================================================

const app = express();

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL ||
    "http://localhost:5173",
    "http://localhost:8080",
    "http://localhost:4173",
    "http://localhost:5000",
];

// =====================================================
// DATABASE
// =====================================================

await connectDB();

// =====================================================
// SECURITY
// =====================================================

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// =====================================================
// CORS
// =====================================================

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("CORS policy: Origin not allowed")
      );
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// =====================================================
// BODY PARSER
// =====================================================

app.use(
  express.json({
    limit: "100kb",
  })
);

// =====================================================
// RATE LIMIT
// =====================================================

app.use(
  "/api",
  generalLimiter
);

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Janta Tea Company API is running.",
  });
});

// =====================================================
// PUBLIC RAZORPAY CONFIG
// =====================================================

app.get(
  "/api/payment/config",
  (req, res) => {
    res.status(200).json({
      success: true,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  }
);

// =====================================================
// API ROUTES
// =====================================================

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/payment",
  paymentRoutes
);

// =====================================================
// 404
// =====================================================

app.use(notFound);

// =====================================================
// ERROR HANDLER
// =====================================================

app.use(errorHandler);

// =====================================================
// START
// =====================================================

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});