import jwt from 'jsonwebtoken'

// Protects admin-only routes (create/update/delete product, view inquiries).
// NOTE: this assumes a login route issuing JWTs exists once the admin panel is built.
// For now, set ADMIN_TOKEN in .env and use it as a static bearer token if you don't
// need a full login flow yet.
export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Not authorized' })
  }

  const token = authHeader.split(' ')[1]

  try {
    if (process.env.JWT_SECRET) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.admin = decoded
      return next()
    }
    // Fallback for simple static-token setup
    if (token === process.env.ADMIN_TOKEN) return next()
    throw new Error('Invalid token')
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' })
  }
}
