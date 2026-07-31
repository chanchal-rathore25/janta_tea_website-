import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const IMAGES = Array.from({ length: 9 }, (_, i) => `/images/gallery/g${i + 1}.jpg`)

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const close = () => setLightboxIndex(null)
  const next = () => setLightboxIndex((i) => (i + 1) % IMAGES.length)
  const prev = () => setLightboxIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length)

  return (
    <>
      <Helmet>
        <title>Gallery | Janta Tea</title>
        <meta name="description" content="A visual journey through Janta Tea's gardens, factory and packaging process." />
      </Helmet>

      <section className="bg-tea-dark py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-tea-cream">Gallery</h1>
      </section>

      <section className="section-container py-16">
        <div className="columns-2 sm:columns-3 gap-4 space-y-4">
          {IMAGES.map((src, i) => (
            <motion.button
              key={src}
              onClick={() => setLightboxIndex(i)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="block w-full overflow-hidden rounded-xl break-inside-avoid group"
            >
              <img
                src={src}
                alt={`Janta Tea gallery ${i + 1}`}
                loading="lazy"
                className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-tea-ink/90 flex items-center justify-center p-5"
            onClick={close}
          >
            <button onClick={close} aria-label="Close" className="absolute top-6 right-6 text-tea-cream text-3xl">
              <HiX />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Previous image"
              className="absolute left-4 sm:left-8 text-tea-cream text-3xl"
            >
              <HiChevronLeft />
            </button>
            <img
              src={IMAGES[lightboxIndex]}
              alt="Gallery large view"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            />
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Next image"
              className="absolute right-4 sm:right-8 text-tea-cream text-3xl"
            >
              <HiChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
