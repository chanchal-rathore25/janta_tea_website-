import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineSearch, HiX } from 'react-icons/hi'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'
import { PRODUCTS, CONTACT_INFO } from '../constants/siteData'

const CATEGORIES = ['All', ...PRODUCTS.map((p) => p.name)]

export default function Products() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [activeProduct, setActiveProduct] = useState(null)

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = category === 'All' || p.name === category
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [search, category])

  return (
    <>
      <Helmet>
        <title>Our Products | Janta Tea</title>
        <meta name="description" content="Explore Janta Tea's full range — Green Tea, Black Tea, Masala Tea, Organic Tea, Herbal Tea and Premium Tea." />
      </Helmet>

      <section className="bg-tea-dark py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-tea-cream">Our Products</h1>
        <p className="mt-3 text-tea-cream/70 max-w-xl mx-auto px-5">Six blends, one promise of quality.</p>
      </section>

      <section className="section-container py-14">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-10">
          <div className="relative w-full sm:max-w-xs">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-tea-ink/40" />
            <input
              type="text"
              placeholder="Search tea..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-tea-dark/10 text-sm focus:outline-none focus-visible:outline-2"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  category === cat ? 'bg-tea-dark text-tea-cream' : 'bg-white text-tea-dark hover:bg-tea-dark/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-tea-ink/60 py-16">No tea matches your search — try a different name.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onOpen={setActiveProduct} />
            ))}
          </div>
        )}
      </section>

      {/* Product Detail Popup */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-tea-ink/60 flex items-center justify-center p-5"
            onClick={() => setActiveProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl overflow-hidden max-w-lg w-full relative"
            >
              <button
                onClick={() => setActiveProduct(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-tea-dark"
              >
                <HiX size={18} />
              </button>
              <img src={activeProduct.image} alt={activeProduct.name} className="w-full aspect-video object-cover" />
              <div className="p-7">
                <h3 className="font-heading text-2xl font-bold text-tea-dark">{activeProduct.name}</h3>
                <p className="text-tea-gold text-xs font-semibold uppercase tracking-wide mt-1 mb-4">{activeProduct.tagline}</p>
                <p className="text-tea-ink/70 text-sm leading-relaxed mb-6">{activeProduct.description}</p>
                <Button as="a" href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hi, I'd like to inquire about ${activeProduct.name}`} variant="primary">
                  Inquire on WhatsApp
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
