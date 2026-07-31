import { motion } from 'framer-motion'
import { HiOutlineArrowRight, HiOutlineArrowDown } from 'react-icons/hi'
import SectionTitle from '../SectionTitle'
import { PROCESS_STEPS } from '../../constants/siteData'

export default function ProcessTimeline() {
  return (
    <section className="bg-tea-dark py-20 sm:py-28">
      <div className="section-container">
        <SectionTitle
          eyebrow="From Garden To Cup"
          title="Tea Manufacturing Process"
          description="Every step, done with the same care as the first batch we ever made."
        />

        <div className="mt-16 flex flex-col lg:flex-row items-stretch justify-between gap-6">
          {PROCESS_STEPS.map((item, i) => (
            <div key={item.step} className="flex-1 flex lg:flex-col items-center gap-6 lg:gap-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex-1 lg:flex-none lg:w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-left lg:text-center hover:bg-white/10 transition-colors duration-300"
              >
                <span className="font-heading text-tea-gold text-2xl font-bold">0{i + 1}</span>
                <h3 className="mt-2 font-heading text-lg font-semibold text-tea-cream">{item.step}</h3>
                <p className="mt-1.5 text-tea-cream/60 text-sm">{item.desc}</p>
              </motion.div>

              {i < PROCESS_STEPS.length - 1 && (
                <span className="text-tea-gold text-2xl shrink-0 lg:my-4">
                  <HiOutlineArrowRight className="hidden lg:block" />
                  <HiOutlineArrowDown className="lg:hidden" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
