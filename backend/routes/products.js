import express from 'express'
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:slug', getProductBySlug)

// Admin only
router.post('/', requireAdmin, createProduct)
router.put('/:id', requireAdmin, updateProduct)
router.delete('/:id', requireAdmin, deleteProduct)

export default router
