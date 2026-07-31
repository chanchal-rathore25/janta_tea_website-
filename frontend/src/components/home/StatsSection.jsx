import Counter from '../Counter'
import { STATS } from '../../constants/siteData'

export default function StatsSection() {
  return (
    <section className="bg-tea-dark py-16 sm:py-20">
      <div className="section-container grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-tea-cream/60 text-sm uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
