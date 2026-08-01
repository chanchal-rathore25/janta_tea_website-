import Product from '../models/Product.js'

export async function getProducts(req, res) {
  try {
    const { category } = req.query
    const filter = { isActive: true }
    if (category && category !== 'All') filter.category = category

    const products = await Product.find(filter).sort({ createdAt: -1 })
    res.json({ success: true, data: products })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch products' })
  }
}

export async function getProductBySlug(req, res) {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true })
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' })
    res.json({ success: true, data: product })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch product' })
  }
}

// Admin-only — protected by auth middleware in routes/products.js
export async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body)
    res.status(201).json({ success: true, data: product })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

export async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' })
    res.json({ success: true, data: product })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true })
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' })
    res.json({ success: true, message: 'Product removed' })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete product' })
  }
}
