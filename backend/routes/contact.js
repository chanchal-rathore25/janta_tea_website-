import express from 'express'
import { submitContact, getContacts } from '../controllers/contactController.js'
import { contactLimiter } from '../middleware/rateLimiter.js'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

router.post('/', contactLimiter, submitContact)
router.get('/', requireAdmin, getContacts) // admin only — view all inquiries

export default router
