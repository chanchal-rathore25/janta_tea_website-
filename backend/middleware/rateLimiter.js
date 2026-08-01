import rateLimit from 'express-rate-limit'

// Prevents form-spam: max 5 inquiries per IP every 15 minutes
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// General API limiter — generous, just guards against abuse
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
})
