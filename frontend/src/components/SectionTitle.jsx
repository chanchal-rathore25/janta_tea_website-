import { motion } from 'framer-motion'

export default function SectionTitle({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex flex-col gap-3 max-w-2xl ${alignment}`}
    >
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="text-3xl sm:text-4xl font-bold text-tea-dark">{title}</h2>
      {description && <p className="text-tea-ink/70 text-base sm:text-lg">{description}</p>}
    </motion.div>
  )
}
