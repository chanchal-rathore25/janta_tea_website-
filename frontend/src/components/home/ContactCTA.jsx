import { motion } from 'framer-motion'
import Button from '../Button'

export default function ContactCTA() {
  return (
    <section className="relative py-24 sm:py-28 overflow-hidden bg-tea-gold">
      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-tea-dark">
            Need Premium Tea For Your Business?
          </h2>
          <p className="mt-4 text-tea-dark/70 text-base sm:text-lg max-w-xl mx-auto">
            Bulk orders, private labelling or a simple home delivery — get in touch and let's talk tea.
          </p>
          <div className="mt-9">
            <Button to="/contact" variant="ghost" className="!bg-tea-dark !text-tea-cream hover:!bg-tea-forest px-10 py-4 text-base">
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
