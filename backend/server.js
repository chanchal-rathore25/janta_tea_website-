import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { apiLimiter } from './middleware/rateLimiter.js'

import contactRoutes from './routes/contact.js'
import productRoutes from './routes/products.js'
import blogRoutes from './routes/blog.js'

// dotenv.config()
dotenv.config({ path: "./.env" });
console.log(process.env.MONGO_URI);
connectDB()
console.log(process.cwd());
const app = express()


app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())
app.use('/api', apiLimiter)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api/contact', contactRoutes)
app.use('/api/products', productRoutes)
app.use('/api/blog', blogRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, error: 'Server error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Janta Tea API running on port ${PORT}`))
