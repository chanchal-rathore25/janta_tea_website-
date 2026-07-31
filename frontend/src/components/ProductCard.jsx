import { motion } from 'framer-motion'
import { HiOutlineArrowRight } from 'react-icons/hi'

export default function ProductCard({ product, index = 0, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      id={product.id}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-soft transition-shadow duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-tea-leaf/10">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl font-semibold text-tea-dark mb-1">{product.name}</h3>
        <p className="text-tea-gold text-xs font-semibold uppercase tracking-wide mb-3">{product.tagline}</p>
        <p className="text-tea-ink/70 text-sm mb-5 line-clamp-2">{product.description}</p>
        <button
          onClick={() => onOpen?.(product)}
          className="inline-flex items-center gap-1.5 text-tea-dark font-semibold text-sm hover:text-tea-gold transition-colors"
        >
          View Details <HiOutlineArrowRight />
        </button>
      </div>
    </motion.div>
  )
}
