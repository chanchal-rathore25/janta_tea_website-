import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('BlogPost', blogSchema)
