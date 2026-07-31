import { motion } from 'framer-motion'
import Button from '../Button'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] flex items-center overflow-hidden">
      {/* Background video with image fallback */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero/tea-plantation.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/tea-plantation.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-tea-dark via-tea-dark/60 to-tea-dark/30" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <span className="section-eyebrow text-tea-gold">Est. 1999 &middot; Garden to Cup</span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-tea-cream leading-[1.1]">
            Premium Tea Crafted With Tradition
          </h1>
          <p className="mt-6 text-tea-cream/80 text-base sm:text-lg max-w-lg">
            From hand-picked leaves to your cup — three generations of tea-makers bringing you
            natural, premium tea, the way it was always meant to be brewed.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button to="/products" variant="primary">Explore Products</Button>
            <Button to="/contact" variant="outline">Contact Us</Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
