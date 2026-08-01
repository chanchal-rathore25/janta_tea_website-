import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String },
    description: { type: String, required: true },
    image: { type: String, required: true }, // Cloudinary URL
    category: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('Product', productSchema)
