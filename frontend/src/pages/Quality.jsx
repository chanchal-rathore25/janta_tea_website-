import { Helmet } from 'react-helmet-async'
import SectionTitle from '../components/SectionTitle'

const SECTIONS = [
  { title: 'Tea Quality', desc: 'Leaf grading at every harvest, tasted and approved before it ever reaches processing.' },
  { title: 'Manufacturing', desc: 'Climate-controlled facilities that preserve aroma from withering through to final drying.' },
  { title: 'Packaging', desc: 'Nitrogen-flushed, moisture-proof packaging that locks in freshness till it reaches you.' },
  { title: 'Quality Control', desc: 'Multi-stage lab testing for purity, pesticide residue and moisture content on every batch.' },
]

export default function Quality() {
  return (
    <>
      <Helmet>
        <title>Quality | Janta Tea</title>
        <meta name="description" content="Our quality standards — from leaf to packaging, certified and lab-tested at every stage." />
      </Helmet>

      <section className="bg-tea-dark py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-tea-cream">Quality You Can Taste</h1>
      </section>

      <section className="section-container py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SECTIONS.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="font-heading text-xl font-semibold text-tea-dark mb-2">{s.title}</h3>
              <p className="text-tea-ink/65 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-tea-leaf/10 py-20">
        <div className="section-container">
          <SectionTitle eyebrow="Verified" title="Certificates" description="Independently certified for quality and safety." />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-5">
            {['FSSAI', 'ISO 22000', 'Organic India', 'Fair Trade'].map((cert) => (
              <div key={cert} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <p className="font-heading font-semibold text-tea-dark text-sm">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
