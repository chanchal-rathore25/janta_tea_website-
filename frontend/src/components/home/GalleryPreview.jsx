import { motion } from 'framer-motion'
import SectionTitle from '../SectionTitle'
import Button from '../Button'

const IMAGES = [
  '/images/gallery/g1.jpg',
  '/images/gallery/g2.jpg',
  '/images/gallery/g3.jpg',
  '/images/gallery/g4.jpg',
  '/images/gallery/g5.jpg',
  '/images/gallery/g6.jpg',
]

export default function GalleryPreview() {
  return (
    <section className="section-container py-20 sm:py-28">
      <SectionTitle eyebrow="A Peek Inside" title="Gallery" description="From the gardens to the factory floor." />

      <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {IMAGES.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`relative overflow-hidden rounded-xl group ${i === 0 ? 'col-span-2 row-span-2' : ''} aspect-square`}
          >
            <img
              src={src}
              alt="Janta Tea gallery"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-tea-dark/0 group-hover:bg-tea-dark/20 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button to="/gallery" variant="ghost">View Full Gallery →</Button>
      </div>
    </section>
  )
}
