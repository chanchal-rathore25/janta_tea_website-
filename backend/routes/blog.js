import express from 'express'
import { getBlogPosts, getBlogPostBySlug, createBlogPost } from '../controllers/blogController.js'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/', getBlogPosts)
router.get('/:slug', getBlogPostBySlug)
router.post('/', requireAdmin, createBlogPost)

export default router
