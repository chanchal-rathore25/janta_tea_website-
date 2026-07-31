import { motion } from 'framer-motion'
import { GiTeapot, GiLeafSwirl, GiTrophy } from 'react-icons/gi'
import { TbTruckDelivery } from 'react-icons/tb'
import SectionTitle from '../SectionTitle'
import { WHY_CHOOSE_US } from '../../constants/siteData'

const ICONS = {
  leaf: GiLeafSwirl,
  cup: GiTeapot,
  truck: TbTruckDelivery,
  award: GiTrophy,
}

export default function WhyChooseUs() {
  return (
    <section className="bg-tea-leaf/10 py-20 sm:py-28">
      <div className="section-container">
        <SectionTitle
          eyebrow="Why Janta Tea"
          title="Why Choose Us"
          description="Quality that's earned trust for over two decades — here's what sets our tea apart."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = ICONS[item.icon]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 text-center hover:-translate-y-1.5 transition-transform duration-300 shadow-sm hover:shadow-soft"
              >
                <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-tea-dark/5 text-tea-dark">
                  <Icon size={30} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-tea-dark mb-2">{item.title}</h3>
                <p className="text-tea-ink/65 text-sm">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
