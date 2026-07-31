import { motion } from 'framer-motion'
import Button from '../Button'

export default function AboutPreview() {
  return (
    <section className="section-container py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <img
          src="/images/about/founder-garden.jpg"
          alt="Janta Tea garden and founders"
          className="rounded-2xl w-full aspect-[4/3] object-cover shadow-soft"
        />
        <div className="absolute -bottom-6 -right-6 bg-tea-gold text-tea-dark rounded-2xl px-6 py-4 shadow-soft hidden sm:block">
          <p className="font-heading text-3xl font-bold">25+</p>
          <p className="text-xs font-semibold uppercase tracking-wide">Years of Craft</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-eyebrow">Our Story</span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-tea-dark">
          A Family Tradition, Steeped Since 1999
        </h2>
        <p className="mt-5 text-tea-ink/70 text-base leading-relaxed">
          What began as a single tea stall run by our founder has grown into a trusted name across
          India — without ever losing the values it started with. Every leaf we source is chosen
          the way it was chosen 25 years ago: by hand, by taste, and by trust.
        </p>
        <div className="mt-8">
          <Button to="/about" variant="ghost" className="!px-0">Read Our Story →</Button>
        </div>
      </motion.div>
    </section>
  )
}
