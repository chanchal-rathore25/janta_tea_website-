import BlogPost from '../models/BlogPost.js'

export async function getBlogPosts(req, res) {
  try {
    const posts = await BlogPost.find({ isPublished: true }).sort({ createdAt: -1 })
    res.json({ success: true, data: posts })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch blog posts' })
  }
}

export async function getBlogPostBySlug(req, res) {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true })
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' })
    res.json({ success: true, data: post })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch post' })
  }
}

export async function createBlogPost(req, res) {
  try {
    const post = await BlogPost.create(req.body)
    res.status(201).json({ success: true, data: post })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}
