import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import SectionTitle from '../components/SectionTitle'

const VALUES = [
  { title: 'Mission', desc: 'To bring natural, honestly-sourced tea to every Indian household without compromising on tradition.' },
  { title: 'Vision', desc: 'To be the most trusted tea brand in India, known for purity and consistency.' },
  { title: 'Core Values', desc: 'Purity, Honesty, Craftsmanship and Community — the four pillars we never compromise on.' },
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Janta Tea</title>
        <meta name="description" content="25+ years of tea-making tradition. Learn about Janta Tea's story, mission, vision and manufacturing standards." />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[380px] flex items-center justify-center bg-tea-dark">
        <img src="/images/products/greentea.jpg" alt="Janta Tea gardens" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="relative z-10 text-center px-5">
          <span className="section-eyebrow text-tea-gold">Since 1999</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-tea-cream">Our Story</h1>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-container py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-tea-ink/70 text-base sm:text-lg leading-relaxed">
            Janta Tea began as a single stall run by our founder with nothing but a kettle, a
            passion for good chai, and an unwavering belief in doing things the honest way. Three
            generations later, that belief is still what guides every leaf we pick, process and pack.
          </p>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-tea-leaf/10 py-20">
        <div className="section-container grid grid-cols-1 sm:grid-cols-3 gap-6">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8"
            >
              <h3 className="font-heading text-xl font-semibold text-tea-dark mb-3">{v.title}</h3>
              <p className="text-tea-ink/65 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Manufacturing & Certificates */}
      <section className="section-container py-20">
        <SectionTitle eyebrow="Behind The Scenes" title="Manufacturing & Certification" description="Standards we hold ourselves to, every single batch." />
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-5">
          {['FSSAI', 'ISO 22000', 'Organic India', 'Fair Trade'].map((cert) => (
            <div key={cert} className="bg-white rounded-xl p-6 text-center shadow-sm">
              <p className="font-heading font-semibold text-tea-dark text-sm">{cert}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
